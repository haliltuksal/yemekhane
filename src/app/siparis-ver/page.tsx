"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ShoppingCart, 
  User, 
  Phone, 
  MapPin, 
  Clock, 
  CreditCard, 
  Truck, 
  CheckCircle,
  ArrowRight,
  Star,
  Utensils,
  Package,
  Plus,
  Minus,
  X
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import { useCart, CartItem } from "@/contexts/CartContext";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number | string; // Decimal string olarak gelebilir
  category: {
    name: string;
    description: string;
  };
}

export default function SiparisVerPage() {
  const { state: cart, addItem, removeItem, updateQuantity, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    notes: "",
    deliveryTime: "asap",
    paymentMethod: "cash"
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  // Menü öğelerini yükle
  useEffect(() => {
    // Menü öğelerini yükle
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        
        if (data.success) {
          // Price'ları number'a çevir
          const itemsWithNumberPrice = data.data.all.map((item: MenuItem) => ({
            ...item,
            price: typeof item.price === 'string' ? parseFloat(item.price) : item.price
          }));
          setMenuItems(itemsWithNumberPrice);
        }
      } catch (error) {
        console.error('Menü yükleme hatası:', error);
      }
    };

    fetchMenuItems();

    // Admin'e sipariş sayfası ziyaret bildirimi gönder
    const notifyPageVisit = async () => {
      try {
        const now = new Date();
        const timeString = now.toLocaleTimeString('tr-TR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });

        await fetch('/api/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'PAGE_VISIT',
            message: '👤 Yeni müşteri sipariş sayfasında',
            timestamp: timeString
          }),
        });
      } catch (error) {
        console.error('Bildirim gönderme hatası:', error);
      }
    };

    // Sayfa yüklendiğinde bildirim gönder
    notifyPageVisit();
  }, []); // Sadece component mount olduğunda çalışsın

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    console.log('🛒 Sepete ekleniyor:', item);
    
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
      quantity: 1,
      category: item.category.name
    };
    
    console.log('📦 Cart item oluşturuldu:', cartItem);
    addItem(cartItem);
    console.log('✅ Sepete eklendi');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 Sipariş formu gönderiliyor...');
    console.log('📦 Sepet içeriği:', cart.items);
    console.log('📝 Form verileri:', formData);
    
    if (cart.items.length === 0) {
      console.log('❌ Sepet boş!');
      alert('Lütfen sepetinize en az bir ürün ekleyin.');
      return;
    }

    setLoading(true);
    console.log('⏳ Loading state aktif...');
    
    try {
      // Sepetteki ilk ürünü seçili menü olarak kullan
      const selectedMenu = cart.items[0].id;
      
      const orderData = {
        ...formData,
        selectedMenu,
        totalAmount: cart.total.toString()
      };

      console.log('📤 Gönderilecek sipariş verisi:', orderData);
      console.log('🌐 API endpoint: /api/orders');

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      console.log('📥 API response status:', response.status);
      console.log('📥 API response headers:', response.headers);

      const result = await response.json();
      console.log('📥 API response data:', result);

      if (result.success) {
        console.log('✅ Sipariş başarılı!');
        setOrderSuccess(true);
        setOrderData(result.data);
        clearCart();
        // Formu temizle
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
          zipCode: "",
          notes: "",
          deliveryTime: "asap",
          paymentMethod: "cash"
        });
        console.log('🧹 Form temizlendi, sepet temizlendi');
      } else {
        console.log('❌ Sipariş başarısız:', result.message);
        alert(result.message || 'Sipariş oluşturulurken bir hata oluştu.');
      }
    } catch (error) {
      console.error('💥 Sipariş hatası:', error);
      alert('Sipariş oluşturulurken bir hata oluştu.');
    } finally {
      console.log('🏁 Finally block çalıştı, loading false yapılıyor...');
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Siparişiniz Alındı!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Siparişiniz başarıyla oluşturuldu. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Sipariş Detayları</CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Sipariş Numarası:</span>
                    <span className="text-green-600 font-bold">{orderData?.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Tahmini Teslimat:</span>
                    <span>{orderData?.estimatedDelivery ? new Date(orderData.estimatedDelivery).toLocaleString('tr-TR') : 'En kısa sürede'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/">
                  Ana Sayfaya Dön
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/siparis-ver">
                  Yeni Sipariş Ver
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <ShoppingCart className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Sipariş Verin
              <span className="block text-green-200">Lezzet Kapınızda</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
              Online sipariş sistemimizle lezzetli yemeklerinizi kolayca sipariş edin. 
              Hızlı teslimat ve kaliteli hizmet garantisi ile yanınızdayız.
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-teal-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Menu Selection */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              <Utensils className="w-4 h-4 mr-2" />
              Menü Seçimi
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Menünüzü Seçin
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lezzetli menü öğelerimizden istediğinizi seçin ve sepete ekleyin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {menuItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.category.name}
                    </Badge>
                    <span className="text-lg font-bold text-green-600">
                      ₺{Number(item.price).toFixed(2)}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Sepete Ekle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cart Summary */}
          {cart.items.length > 0 && (
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <ShoppingCart className="w-5 h-5" />
                  Sepetiniz ({cart.itemCount} ürün)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="font-medium text-green-600 w-20 text-right">
                          ₺{(Number(item.price) * item.quantity).toFixed(2)}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Toplam:</span>
                      <span className="text-2xl font-bold text-green-600">₺{Number(cart.total).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Order Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Sipariş Formu
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Bilgilerinizi doldurun ve siparişinizi tamamlayın. 
                Hızlı teslimat ile yemeğiniz kapınızda!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <User className="w-5 h-5 text-green-600" />
                    Kişisel Bilgiler
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Ad Soyad *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Adınız ve soyadınız"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="05XX XXX XX XX"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ornek@email.com"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MapPin className="w-5 h-5 text-green-600" />
                    Teslimat Adresi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Adres *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Detaylı adres bilgisi"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Şehir *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="İstanbul"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Posta Kodu</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="34000"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Time */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Clock className="w-5 h-5 text-green-600" />
                    Teslimat Zamanı
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: "asap", label: "En Kısa Sürede", time: "30-45 dk" },
                      { id: "1hour", label: "1 Saat İçinde", time: "60 dk" },
                      { id: "2hour", label: "2 Saat İçinde", time: "120 dk" },
                      { id: "specific", label: "Belirli Saat", time: "Seçilen saat" }
                    ].map((time) => (
                      <div
                        key={time.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.deliveryTime === time.id
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, deliveryTime: time.id }))}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{time.label}</h3>
                            <p className="text-sm text-gray-600">{time.time}</p>
                          </div>
                          {formData.deliveryTime === time.id && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    Ödeme Yöntemi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: "cash", label: "Nakit", icon: "💵" },
                      { id: "card", label: "Kredi Kartı", icon: "💳" },
                      { id: "online", label: "Online Ödeme", icon: "🌐" }
                    ].map((method) => (
                      <div
                        key={method.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === method.id
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{method.icon}</div>
                          <h3 className="font-semibold text-gray-900">{method.label}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Ek Notlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Özel istekleriniz, alerjileriniz veya ek notlarınız..."
                    rows={3}
                  />
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 px-12 py-4 text-lg"
                  disabled={loading || cart.items.length === 0}
                >
                  {loading ? (
                    "Sipariş Gönderiliyor..."
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Siparişi Tamamla
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
                
                {cart.items.length === 0 && (
                  <p className="text-red-500 mt-2">
                    Lütfen önce sepetinize ürün ekleyin.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Neden Online Sipariş?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Online sipariş sistemimizin avantajları
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Hızlı Sipariş
              </h3>
              <p className="text-gray-600">
                2 dakikada siparişinizi tamamlayın, 
                hızlı teslimat ile yemeğinizi alın.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Güvenli Teslimat
              </h3>
              <p className="text-gray-600">
                Özel paketleme ve hijyenik 
                teslimat garantisi.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Kalite Garantisi
              </h3>
              <p className="text-gray-600">
                Taze malzemeler ve lezzetli 
                yemeğiniz garantisi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Hemen Sipariş Verin
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Lezzetli yemeklerinizi online sipariş sistemiyle 
            kolayca sipariş edin. Hızlı teslimat ve kaliteli 
            hizmet garantisi ile yanınızdayız.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg">
              <Link href="/iletisim">
                Bize Ulaşın
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg">
              <Link href="/menu">
                Menüyü İncele
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
