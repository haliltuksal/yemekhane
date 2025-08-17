"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Users, 
  Utensils, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  DollarSign,
  LogOut,
  Bell,
  X,
  FileText,
  Activity
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Notify } from 'notiflix';

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalUsers: number;
  totalRevenue: number;
  todayOrders: number;
}

interface Notification {
  id: string;
  type: 'NEW_ORDER' | 'ORDER_STATUS_UPDATE' | 'PAGE_VISIT' | 'PING';
  data?: any;
  message?: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    todayOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sseConnected, setSseConnected] = useState(false);
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user.role !== "ADMIN") {
      router.push("/admin/login");
      return;
    }

    // Notiflix'i initialize et
    Notify.init({
      position: 'right-top',
      timeout: 10000, // 10 saniye
      clickToClose: true,
      pauseOnHover: true,
      fontSize: '16px',
      cssAnimationStyle: 'from-top',
      success: {
        background: '#10b981',
        textColor: '#ffffff',
        childClassName: 'notiflix-notify-success',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-check-circle',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(50,198,130,0.2)',
      },
      warning: {
        background: '#f59e0b',
        textColor: '#ffffff',
        childClassName: 'notiflix-notify-warning',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-exclamation-triangle',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(245,158,11,0.2)',
      },
      info: {
        background: '#3b82f6',
        textColor: '#ffffff',
        childClassName: 'notiflix-notify-info',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-info-circle',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(59,130,246,0.2)',
      },
    });

    fetchDashboardStats();
    setupSSE();
    checkAudioPermission();
  }, [session, status, router]);

  const checkAudioPermission = async () => {
    try {
      // Audio context oluşturmayı dene
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      await audioContext.resume();
      setAudioPermission(true);
    } catch (error) {
      console.error('Audio permission hatası:', error);
      setAudioPermission(false);
    }
  };

  const requestAudioPermission = async () => {
    try {
      // User interaction ile audio context oluştur
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      await audioContext.resume();
      setAudioPermission(true);
      
      // Test sesi çal
      playNotificationSound();
    } catch (error) {
      console.error('Audio permission isteği hatası:', error);
      setAudioPermission(false);
    }
  };

  const testNotificationSound = () => {
    playNotificationSound();
    
    // Test popup'ı göster
    Notify.info(
      `🔊 SES TEST!\n\n` +
      `Ses sistemi çalışıyor.\n` +
      `Real-time bildirimlerde bu ses çalacak.`,
      {
        timeout: 5000,
        clickToClose: true,
        pauseOnHover: true
      }
    );
  };

  const setupSSE = () => {
    console.log('🔌 SSE bağlantısı kuruluyor...');
    
    const eventSource = new EventSource('/api/notifications');
    
    eventSource.onopen = () => {
      console.log('✅ SSE bağlantısı açıldı');
      setSseConnected(true);
    };
    
    eventSource.onmessage = (event) => {
      console.log('📡 SSE mesajı alındı:', event.data);
      
      try {
        const notification = JSON.parse(event.data);
        console.log('📝 Bildirim parse edildi:', notification);
        
        // PING mesajlarını filtrele
        if (notification.type === 'PING') {
          return;
        }

        // Yeni bildirimi ekle
        const newNotification: Notification = {
          id: notification.id || Date.now().toString(),
          type: notification.type,
          data: notification.data,
          message: notification.message,
          timestamp: notification.timestamp || new Date().toISOString()
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);

        // NEW_ORDER bildirimi için basit işlem
        if (notification.type === 'NEW_ORDER') {
          console.log('🔔 NEW_ORDER bildirimi alındı');
          playNotificationSound();
          fetchDashboardStats();
          
          // Basit Notiflix popup göster
          Notify.info('🔔 Yeni sipariş geldi!', {
            timeout: 5000,
            clickToClose: true,
            pauseOnHover: true
          });
        }

      } catch (error) {
        console.error('❌ SSE mesaj parse hatası:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('❌ SSE bağlantı hatası:', error);
      setSseConnected(false);
      
      // 5 saniye sonra yeniden bağlan
      setTimeout(() => {
        console.log('🔄 SSE yeniden bağlanıyor...');
        setupSSE();
      }, 5000);
    };

    return eventSource;
  };

  const playNotificationSound = () => {
    try {
      // Method 1: Web Audio API ile notification sound (en güvenilir)
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Notification sound frequency (800Hz beep)
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 2.5);
      
      console.log('✅ Web Audio API ile ses çalındı (2.5 saniye)');
      
    } catch (error) {
      console.log('⚠️ Web Audio API hatası, HTML5 Audio deneniyor...');
      
      try {
        // Method 2: HTML5 Audio fallback
        const audio = new Audio();
        
        // Birden fazla ses seçeneği dene
        const soundOptions = [
          // Base64 encoded beep sound
          'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
          // Alternatif beep sound
          'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
        ];
        
        audio.src = soundOptions[0];
        audio.volume = 0.5;
        audio.preload = 'auto';
        
        // User interaction kontrolü
        if (audioPermission) {
          const playPromise = audio.play();
          
          if (playPromise !== undefined) {
            playPromise.then(() => {
              console.log('✅ HTML5 Audio ile ses çalındı (2.5 saniye)');
            }).catch((playError) => {
              console.log('❌ HTML5 Audio play hatası:', playError);
              
              // Hata durumunda alternatif ses dene
              if (soundOptions.length > 1) {
                audio.src = soundOptions[1];
                audio.play().then(() => {
                  console.log('✅ Alternatif ses çalındı (2.5 saniye)');
                }).catch((altError) => {
                  console.log('❌ Alternatif ses de çalınamadı:', altError);
                });
              }
            });
          }
        } else {
          console.log('⚠️ Audio permission yok, ses çalınamadı');
        }
        
      } catch (audioError) {
        console.log('❌ HTML5 Audio hatası:', audioError);
      }
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const [ordersRes, usersRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/users')
      ]);

      const ordersData = await ordersRes.json();
      const usersData = await usersRes.json();

      if (ordersData.success && usersData.success) {
        const orders = ordersData.data;
        const users = usersData.data;

        const totalRevenue = orders.reduce((sum: number, order: any) => 
          sum + parseFloat(order.totalAmount), 0
        );

        const pendingOrders = orders.filter((order: any) => 
          order.status === 'PENDING'
        ).length;

        const completedOrders = orders.filter((order: any) => 
          order.status === 'DELIVERED'
        ).length;

        const today = new Date().toDateString();
        const todayOrders = orders.filter((order: any) => 
          new Date(order.createdAt).toDateString() === today
        ).length;

        setStats({
          totalOrders: orders.length,
          pendingOrders,
          completedOrders,
          totalUsers: users.length,
          totalRevenue,
          todayOrders
        });
      }
    } catch (error) {
      console.error('Dashboard stats hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'NEW_ORDER':
        return <ShoppingCart className="w-4 h-4 text-green-600" />;
      case 'ORDER_STATUS_UPDATE':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'PAGE_VISIT':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'PING':
        return <Activity className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNotificationTitle = (type: string) => {
    switch (type) {
      case 'NEW_ORDER':
        return 'Yeni Sipariş!';
      case 'ORDER_STATUS_UPDATE':
        return 'Sipariş Durumu Güncellendi';
      case 'PAGE_VISIT':
        return 'Sayfa Ziyareti';
      default:
        return 'Bildirim';
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Hoş geldin, {session.user.name}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Audio Test Button */}
              <div className="flex items-center gap-2">
                {audioPermission === null && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={requestAudioPermission}
                    className="text-xs"
                  >
                    🎵 Ses İzni İste
                  </Button>
                )}
                {audioPermission === true && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={testNotificationSound}
                    className="text-xs text-green-600 border-green-300"
                  >
                    🔊 Ses Test
                  </Button>
                )}
                {audioPermission === false && (
                  <span className="text-xs text-red-500">❌ Ses Yok</span>
                )}
              </div>

              {/* Notification Bell */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
                    >
                      {notifications.length}
                    </Badge>
                  )}
                </Button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="p-3 border-b">
                      <h3 className="font-semibold">Bildirimler</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className={`w-2 h-2 rounded-full ${sseConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        {sseConnected ? 'Bağlı' : 'Bağlantı Yok'}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span>🔊 Ses:</span>
                        {audioPermission === true && <span className="text-green-600">Aktif</span>}
                        {audioPermission === false && <span className="text-red-600">Kapalı</span>}
                        {audioPermission === null && <span className="text-yellow-600">Bilinmiyor</span>}
                      </div>
                    </div>
                    <div className="p-2">
                      {notifications.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">Bildirim yok</p>
                      ) : (
                        notifications.map((notification) => (
                          <div key={notification.id} className="p-3 border-b last:border-b-0 hover:bg-gray-50">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                {getNotificationIcon(notification.type)}
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">
                                    {getNotificationTitle(notification.type)}
                                  </h4>
                                  {/* Sadece message göster, karmaşık objeler kullanma */}
                                  <p className="text-xs text-gray-600 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {notification.timestamp}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeNotification(notification.id)}
                                className="h-6 w-6 p-0"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Button onClick={handleLogout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Çıkış Yap
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                Tüm zamanlar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bekleyen Sipariş</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">
                Onay bekleyen
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₺{stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Tüm zamanlar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bugünkü Sipariş</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.todayOrders}</div>
              <p className="text-xs text-muted-foreground">
                Bugün
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                Siparişleri Yönet
              </CardTitle>
              <CardDescription>
                Tüm siparişleri görüntüle ve durumlarını güncelle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => router.push('/admin/orders')}>
                Siparişlere Git
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-orange-600" />
                Menü Yönetimi
              </CardTitle>
              <CardDescription>
                Menü öğelerini ve kategorileri yönet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => router.push('/admin/menu')}>
                Menüye Git
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                İçerik Yönetimi
              </CardTitle>
              <CardDescription>
                Sayfa içeriklerini ve sertifikaları yönet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => router.push('/admin/content')}>
                İçeriğe Git
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* İçerik Yönetimi */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/admin/content')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İçerik Yönetimi</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Hakkımızda, Anasayfa, Sertifikalar, Footer
            </p>
          </CardContent>
        </Card>

        {/* Bildirim Log Sistemi */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/admin/notifications')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bildirim Log</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-xs text-muted-foreground">
              Tüm bildirimlerin geçmişi
            </p>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
            <CardDescription>
              Sistemdeki son değişiklikler ve aktiviteler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {stats.todayOrders} yeni sipariş alındı
                </span>
                <Badge variant="secondary" className="ml-auto">
                  Bugün
                </Badge>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {stats.pendingOrders} sipariş onay bekliyor
                </span>
                <Badge variant="outline" className="ml-auto">
                  Bekliyor
                </Badge>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Toplam {stats.totalUsers} kullanıcı kayıtlı
                </span>
                <Badge variant="secondary" className="ml-auto">
                  Toplam
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
