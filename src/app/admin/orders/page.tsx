"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  Clock, 
  Truck, 
  X,
  ArrowLeft,
  Calendar,
  Phone,
  MapPin,
  User
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: string;
  createdAt: string;
  deliveryTime?: string;
  deliveryAddress: string;
  deliveryCity: string;
  notes?: string;
  paymentMethod: string;
  paymentStatus: string;
  user: {
    name: string;
    phone: string;
    email?: string;
  };
  orderItems: Array<{
    id: string;
    quantity: number;
    price: string;
    notes?: string;
    menuItem: {
      name: string;
      price: string;
    };
  }>;
}

interface OrderStatus {
  value: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

const orderStatuses: OrderStatus[] = [
  { value: "PENDING", label: "Bekliyor", color: "bg-orange-100 text-orange-800", icon: <Clock className="w-4 h-4" /> },
  { value: "CONFIRMED", label: "Onaylandı", color: "bg-blue-100 text-blue-800", icon: <CheckCircle className="w-4 h-4" /> },
  { value: "PREPARING", label: "Hazırlanıyor", color: "bg-yellow-100 text-yellow-800", icon: <Clock className="w-4 h-4" /> },
  { value: "READY", label: "Hazır", color: "bg-purple-100 text-purple-800", icon: <CheckCircle className="w-4 h-4" /> },
  { value: "OUT_FOR_DELIVERY", label: "Yolda", color: "bg-indigo-100 text-indigo-800", icon: <Truck className="w-4 h-4" /> },
  { value: "DELIVERED", label: "Teslim Edildi", color: "bg-green-100 text-green-800", icon: <CheckCircle className="w-4 h-4" /> },
  { value: "CANCELLED", label: "İptal Edildi", color: "bg-red-100 text-red-800", icon: <X className="w-4 h-4" /> },
];

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user.role !== "ADMIN") {
      router.push("/admin/login");
      return;
    }

    fetchOrders();
    setupSSE();
  }, [session, status, router]);

  const setupSSE = () => {
    const eventSource = new EventSource('/api/notifications');

    eventSource.onopen = () => {
      console.log('SSE bağlantısı kuruldu (Orders)');
    };

    eventSource.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data);
        
        if (notification.type === 'PING') {
          return;
        }

        // Yeni sipariş geldiğinde listeyi güncelle
        if (notification.type === 'NEW_ORDER') {
          fetchOrders();
        }

        // Sipariş durumu güncellendiğinde listeyi güncelle
        if (notification.type === 'ORDER_STATUS_UPDATE') {
          fetchOrders();
        }

      } catch (error) {
        console.error('SSE mesaj parse hatası:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE bağlantı hatası (Orders):', error);
      eventSource.close();
      
      // 5 saniye sonra yeniden bağlanmayı dene
      setTimeout(() => {
        setupSSE();
      }, 5000);
    };

    // Component unmount olduğunda bağlantıyı kapat
    return () => {
      eventSource.close();
    };
  };

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter, dateFilter]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error('Siparişler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.phone.includes(searchTerm)
      );
    }

    // Durum filtresi
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Tarih filtresi
    if (dateFilter !== "all") {
      const today = new Date();
      const orderDate = new Date();
      
      switch (dateFilter) {
        case "today":
          filtered = filtered.filter(order => 
            new Date(order.createdAt).toDateString() === today.toDateString()
          );
          break;
        case "week":
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(order => 
            new Date(order.createdAt) >= weekAgo
          );
          break;
        case "month":
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(order => 
            new Date(order.createdAt) >= monthAgo
          );
          break;
      }
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Sipariş listesini güncelle
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId 
              ? { ...order, status: newStatus }
              : order
          )
        );
        
        // Seçili siparişi güncelle
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Sipariş durumu güncellenirken hata:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusInfo = orderStatuses.find(s => s.value === status);
    if (!statusInfo) return null;

    return (
      <Badge className={`${statusInfo.color} flex items-center gap-1`}>
        {statusInfo.icon}
        {statusInfo.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/admin')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sipariş Yönetimi</h1>
                <p className="text-gray-600">Tüm siparişleri görüntüle ve yönet</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                Toplam: {filteredOrders.length}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtreler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Arama</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Sipariş no, müşteri adı..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="status">Durum</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tüm durumlar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm durumlar</SelectItem>
                    {orderStatuses.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="date">Tarih</Label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tüm tarihler" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm tarihler</SelectItem>
                    <SelectItem value="today">Bugün</SelectItem>
                    <SelectItem value="week">Son 7 gün</SelectItem>
                    <SelectItem value="month">Son 30 gün</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setDateFilter("all");
                  }}
                  className="w-full"
                >
                  Filtreleri Temizle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Siparişler</CardTitle>
                <CardDescription>
                  {filteredOrders.length} sipariş bulundu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Sipariş bulunamadı</p>
                    </div>
                  ) : (
                    filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedOrder?.id === order.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              #{order.orderNumber}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {order.user.name} • {order.user.phone}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">
                              ₺{order.totalAmount}
                            </div>
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(order.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {order.deliveryCity}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Sipariş Detayı</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedOrder(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    #{selectedOrder.orderNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Customer Info */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Müşteri Bilgileri
                    </h4>
                    <div className="bg-gray-50 p-3 rounded-lg space-y-2 text-sm">
                      <p><strong>Ad:</strong> {selectedOrder.user.name}</p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {selectedOrder.user.phone}
                      </p>
                      {selectedOrder.user.email && (
                        <p><strong>Email:</strong> {selectedOrder.user.email}</p>
                      )}
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {selectedOrder.deliveryAddress}, {selectedOrder.deliveryCity}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium mb-2">Sipariş Öğeleri</h4>
                    <div className="space-y-2">
                      {selectedOrder.orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <div>
                            <p className="font-medium">{item.menuItem.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.quantity} adet × ₺{item.menuItem.price}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₺{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Info */}
                  <div>
                    <h4 className="font-medium mb-2">Sipariş Bilgileri</h4>
                    <div className="bg-gray-50 p-3 rounded-lg space-y-2 text-sm">
                      <p><strong>Toplam:</strong> ₺{selectedOrder.totalAmount}</p>
                      <p><strong>Ödeme Yöntemi:</strong> {selectedOrder.paymentMethod}</p>
                      <p><strong>Ödeme Durumu:</strong> {selectedOrder.paymentStatus}</p>
                      <p><strong>Tarih:</strong> {formatDate(selectedOrder.createdAt)}</p>
                      {selectedOrder.notes && (
                        <p><strong>Notlar:</strong> {selectedOrder.notes}</p>
                      )}
                    </div>
                  </div>

                  {/* Status Update */}
                  <div>
                    <h4 className="font-medium mb-2">Durum Güncelle</h4>
                    <Select 
                      value={selectedOrder.status} 
                      onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {orderStatuses.map(status => (
                          <SelectItem key={status.value} value={status.value}>
                            <div className="flex items-center gap-2">
                              {status.icon}
                              {status.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Sipariş Seçin</CardTitle>
                  <CardDescription>
                    Detayları görmek için bir sipariş seçin
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8 text-gray-500">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Sipariş seçilmedi</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
