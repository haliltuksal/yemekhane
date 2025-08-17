import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Clock, 
  Truck, 
  Shield, 
  Users, 
  Building, 
  Zap, 
  Star,
  ArrowRight,
  CheckCircle,
  Phone,
  MapPin,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";

export default function PaketServisPage() {
  const serviceTypes = [
    {
      icon: Building,
      title: "Kurumsal Paket Servis",
      description: "Şirketler için özel menü ve toplu sipariş hizmeti",
      features: ["Özel menü tasarımı", "Toplu sipariş indirimi", "Düzenli teslimat"]
    },
    {
      icon: Users,
      title: "Bireysel Paket Servis",
      description: "Ev ve ofis için hızlı ve lezzetli yemek servisi",
      features: ["Hızlı teslimat", "Çeşitli menü seçenekleri", "Online ödeme"]
    },
    {
      icon: Zap,
      title: "Acil Sipariş",
      description: "30 dakika içinde kapınızda, acil durumlar için",
      features: ["30 dakika teslimat", "7/24 hizmet", "Öncelikli işlem"]
    },
    {
      icon: Package,
      title: "Özel Paketler",
      description: "Toplantı, etkinlik ve özel günler için özel paketler",
      features: ["Özel menü tasarımı", "Sunum malzemeleri", "Profesyonel servis"]
    }
  ];

  const advantages = [
    {
      icon: Clock,
      title: "Hızlı Teslimat",
      description: "Ortalama 45 dakika içinde kapınızda"
    },
    {
      icon: Shield,
      title: "Kalite Garantisi",
      description: "Taze malzemeler ve hijyenik hazırlık"
    },
    {
      icon: Truck,
      title: "Ücretsiz Teslimat",
      description: "Belirli tutar üzeri siparişlerde"
    },
    {
      icon: Star,
      title: "Müşteri Memnuniyeti",
      description: "%98 müşteri memnuniyet oranı"
    }
  ];

  const deliveryAreas = [
    "Kadıköy",
    "Üsküdar", 
    "Beşiktaş",
    "Şişli",
    "Beyoğlu",
    "Fatih",
    "Bakırköy",
    "Maltepe"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Package className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Paket Servis
              <span className="block text-orange-200">Hizmeti</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Lezzetli yemeklerinizi evinize, ofisinize veya istediğiniz yere 
              hızlı ve güvenli bir şekilde ulaştırıyoruz. Kurumsal ve bireysel 
              ihtiyaçlarınız için özel çözümler sunuyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg">
                <Link href="/siparis-ver">
                  Hemen Sipariş Ver
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg">
                <Link href="/iletisim">
                  İletişime Geç
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Service Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              <Package className="w-4 h-4 mr-2" />
              Hizmet Türleri
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Size Özel Paket Servis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Her ihtiyaca uygun paket servis çözümlerimizle 
              hizmetinizdeyiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceTypes.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-orange-50">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                      <Icon className="w-8 h-8 text-orange-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Neden Paket Servis?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Paket servis hizmetimizle size sunduğumuz 
              avantajlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="mx-auto w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-700 transition-colors">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Teslimat Bölgeleri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              İstanbul'un birçok bölgesine hizmet veriyoruz. 
              Bölgenizde hizmet verip vermediğimizi öğrenmek için 
              iletişime geçin.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {deliveryAreas.map((area, index) => (
                <div key={index} className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg font-medium">
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Nasıl Çalışır?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sadece 3 basit adımda lezzetli yemeklerinizi 
              sipariş edin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Menü Seçin
              </h3>
              <p className="text-gray-600">
                Günün menüsünden veya özel menülerimizden 
                istediğiniz yemekleri seçin.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Sipariş Verin
              </h3>
              <p className="text-gray-600">
                Online sipariş sistemimizden kolayca 
                siparişinizi tamamlayın.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Yemeğinizi Alın
              </h3>
              <p className="text-gray-600">
                Hızlı teslimat ile yemeğinizi 
                kapınızda alın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Hemen Sipariş Verin
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Lezzetli yemeklerinizi evinize veya ofisinize 
            getirelim. Online sipariş sistemimizle kolayca 
            sipariş verebilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg">
              <Link href="/siparis-ver">
                Sipariş Ver
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg">
              <Link href="/iletisim">
                Bize Ulaşın
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
