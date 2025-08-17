"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Search, 
  Filter, 
  Calendar,
  ArrowLeft,
  RefreshCw,
  FileText,
  ShoppingCart,
  User,
  Eye
} from "lucide-react";

interface NotificationLog {
  id: string;
  type: string;
  message: string;
  data?: any;
  timestamp: string;
  userId?: string;
  user?: {
    name: string;
    email: string;
  };
}

export default function NotificationLogPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: ""
  });

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user.role !== "ADMIN") {
      router.push("/admin/login");
      return;
    }

    fetchNotifications();
  }, [session, status, router]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // TODO: API endpoint'ten bildirim log'larını çek
      const mockData: NotificationLog[] = [
        {
          id: '1',
          type: 'NEW_ORDER',
          message: '🔔 YENİ SİPARİŞ! #20250818-0001 - Halil Tuksal - ₺45 - 14:30:22',
          data: { orderNumber: '20250818-0001', customerName: 'Halil Tuksal', totalAmount: 45 },
          timestamp: '2025-01-18 14:30:22',
          user: { name: 'Admin User', email: 'admin@yemekhane.com' }
        },
        {
          id: '2',
          type: 'PAGE_VISIT',
          message: '👤 Yeni müşteri sipariş sayfasında',
          data: { page: '/siparis-ver', timestamp: '14:25:15' },
          timestamp: '2025-01-18 14:25:15',
          user: { name: 'Admin User', email: 'admin@yemekhane.com' }
        },
        {
          id: '3',
          type: 'ORDER_STATUS_UPDATE',
          message: '✅ Sipariş durumu güncellendi: #20250818-0001',
          data: { orderNumber: '20250818-0001', status: 'PREPARING' },
          timestamp: '2025-01-18 14:35:10',
          user: { name: 'Admin User', email: 'admin@yemekhane.com' }
        }
      ];
      
      setNotifications(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Bildirimler yüklenemedi:', error);
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'NEW_ORDER':
        return <ShoppingCart className="h-4 w-4" />;
      case 'PAGE_VISIT':
        return <User className="h-4 w-4" />;
      case 'ORDER_STATUS_UPDATE':
        return <FileText className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'NEW_ORDER':
        return <Badge variant="default" className="bg-green-500">Yeni Sipariş</Badge>;
      case 'PAGE_VISIT':
        return <Badge variant="secondary">Sayfa Ziyareti</Badge>;
      case 'ORDER_STATUS_UPDATE':
        return <Badge variant="outline">Durum Güncelleme</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "all" || notification.type === selectedType;
    
    const matchesDate = (!dateRange.start || notification.timestamp >= dateRange.start) &&
                       (!dateRange.end || notification.timestamp <= dateRange.end);
    
    return matchesSearch && matchesType && matchesDate;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setDateRange({ start: "", end: "" });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Bildirim Log Sistemi</h1>
        <Button onClick={() => router.push('/admin')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Dashboard'a Dön
        </Button>
      </div>

      {/* Filtreler */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtreler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Mesaj veya tip ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Bildirim Tipi</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">Tümü</option>
                <option value="NEW_ORDER">Yeni Sipariş</option>
                <option value="PAGE_VISIT">Sayfa Ziyareti</option>
                <option value="ORDER_STATUS_UPDATE">Durum Güncelleme</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Başlangıç Tarihi</label>
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Bitiş Tarihi</label>
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button onClick={clearFilters} variant="outline">
              Filtreleri Temizle
            </Button>
            <Button onClick={fetchNotifications}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Yenile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.type === 'NEW_ORDER').length}
                </p>
                <p className="text-sm text-gray-600">Toplam Sipariş</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.type === 'PAGE_VISIT').length}
                </p>
                <p className="text-sm text-gray-600">Sayfa Ziyareti</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.type === 'ORDER_STATUS_UPDATE').length}
                </p>
                <p className="text-sm text-gray-600">Durum Güncelleme</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{notifications.length}</p>
                <p className="text-sm text-gray-600">Toplam Bildirim</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bildirim Listesi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Bildirim Geçmişi
            <Badge variant="secondary">{filteredNotifications.length} bildirim</Badge>
          </CardTitle>
          <CardDescription>
            Tüm bildirimlerin detaylı log kayıtları
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Filtrelere uygun bildirim bulunamadı
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeBadge(notification.type)}
                          <span className="text-sm text-gray-500">
                            {new Date(notification.timestamp).toLocaleString('tr-TR')}
                          </span>
                        </div>
                        
                        <p className="text-sm font-medium mb-1">{notification.message}</p>
                        
                        {notification.data && (
                          <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded">
                            <pre className="whitespace-pre-wrap">
                              {JSON.stringify(notification.data, null, 2)}
                            </pre>
                          </div>
                        )}
                        
                        {notification.user && (
                          <div className="text-xs text-gray-500 mt-2">
                            Admin: {notification.user.name} ({notification.user.email})
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
