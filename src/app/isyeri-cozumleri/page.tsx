import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  Utensils, 
  Calculator, 
  Shield, 
  Clock, 
  Star, 
  Award,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Heart,
  Zap
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";

export default function IsyeriCozumleriPage() {
  const businessSolutions = [
    {
      icon: Utensils,
      title: "Kurumsal Catering",
      description: "Toplantı, konferans ve etkinlikler için profesyonel catering hizmeti",
      features: ["Özel menü tasarımı", "Profesyonel servis", "Esnek porsiyon"]
    },
    {
      icon: Users,
      title: "Toplu Yemek Servisi",
      description: "Şirket çalışanları için günlük, haftalık veya aylık yemek servisi",
      features: ["Düzenli teslimat", "Çeşitli menü seçenekleri", "Maliyet optimizasyonu"]
    },
    {
      icon: Building2,
      title: "Ofis Yemekleri",
      description: "Küçük ve orta ölçekli ofisler için özel yemek çözümleri",
      features: ["Esnek sipariş sistemi", "Hızlı teslimat", "Uygun fiyatlar"]
    },
    {
      icon: Award,
      title: "VIP Hizmetler",
      description: "Üst düzey yöneticiler ve özel misafirler için premium hizmet",
      features: ["Premium menüler", "Özel sunum", "Kişisel şef hizmeti"]
    }
  ];

  const advantages = [
    {
      icon: Calculator,
      title: "Maliyet Avantajı",
      description: "Toplu siparişlerde %20-30 indirim imkanı"
    },
    {
      icon: Shield,
      title: "Kalite Garantisi",
      description: "HACCP ve ISO standartlarında üretim"
    },
    {
      icon: Clock,
      title: "Zaman Tasarrufu",
      description: "Çalışanlar için öğle arası tasarrufu"
    },
    {
      icon: TrendingUp,
      title: "Verimlilik Artışı",
      description: "Sağlıklı beslenme ile performans artışı"
    }
  ];

  const testimonials = [
    {
      company: "TechCorp A.Ş.",
      industry: "Teknoloji",
      feedback: "3 yıldır hizmet alıyoruz. Çalışanlarımızın memnuniyeti %95'in üzerinde. Menü çeşitliliği ve kalite standartları mükemmel.",
      rating: 5,
      employeeCount: "150+ çalışan"
    },
    {
      company: "FinansBank",
      industry: "Finans",
      feedback: "Günlük 200+ porsiyon yemek servisimizde hiç aksama yaşamadık. Profesyonel yaklaşımları ve esnek çözümleri takdire şayan.",
      rating: 5,
      employeeCount: "200+ çalışan"
    },
    {
      company: "Medikal Ltd.",
      industry: "Sağlık",
      feedback: "Hastane personelimiz için özel diyet menüleri hazırlıyorlar. Hijyen standartları çok yüksek, güvenle tercih ediyoruz.",
      rating: 5,
      employeeCount: "80+ çalışan"
    }
  ];

  const industries = [
    "Teknoloji",
    "Finans", 
    "Sağlık",
    "Eğitim",
    "Üretim",
    "Hizmet",
    "Turizm",
    "Enerji"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Building2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              İşyeri
              <span className="block text-purple-200">Çözümleri</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Şirketinizin yemek ihtiyaçları için profesyonel ve ekonomik çözümler 
              sunuyoruz. Çalışanlarınızın memnuniyeti ve verimliliği için 
              özel menüler ve esnek hizmet seçenekleri.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg">
                <Link href="/iletisim">
                  Teklif Alın
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg">
                <Link href="/siparis-ver">
                  Hemen Sipariş Ver
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Business Solutions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              <Building2 className="w-4 h-4 mr-2" />
              İş Çözümleri
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Size Özel İş Çözümleri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Her sektör ve şirket büyüklüğü için uygun 
              yemek çözümleri sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-purple-50">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                      <Icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {solution.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {solution.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
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
      <section className="py-20 bg-gradient-to-r from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Neden İşyeri Çözümlerimiz?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İşyeriniz için sunduğumuz yemek çözümlerinin 
              avantajları.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="mx-auto w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-700 transition-colors">
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

      {/* Industries We Serve */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Hizmet Verdiğimiz Sektörler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Farklı sektörlerdeki işletmelere özel çözümler 
              sunuyoruz.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {industries.map((industry, index) => (
                <div key={index} className="bg-purple-100 text-purple-800 px-4 py-3 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Müşteri Referansları
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Güvenilir iş ortaklarımızın deneyimleri ve 
              memnuniyetleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {testimonial.company}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {testimonial.industry} • {testimonial.employeeCount}
                      </CardDescription>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700 italic leading-relaxed">
                    "{testimonial.feedback}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Nasıl Çalışırız?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İşyeriniz için yemek çözümlerini 4 basit adımda 
              hayata geçiriyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                İhtiyaç Analizi
              </h3>
              <p className="text-gray-600">
                Şirketinizin ihtiyaçlarını ve bütçesini 
                detaylı olarak analiz ediyoruz.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Özel Teklif
              </h3>
              <p className="text-gray-600">
                Size özel menü ve hizmet teklifini 
                hazırlayıp sunuyoruz.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Anlaşma
              </h3>
              <p className="text-gray-600">
                Detayları netleştirip anlaşmayı 
                imzalıyoruz.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Hizmet Başlangıcı
              </h3>
              <p className="text-gray-600">
                Belirlenen tarihte hizmete 
                başlıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            İşyeriniz İçin Teklif Alın
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Şirketinizin yemek ihtiyaçları için özel çözümler 
            sunalım. Ücretsiz danışmanlık ve teklif için 
            hemen iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg">
              <Link href="/iletisim">
                Teklif Alın
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg">
              <Link href="/siparis-ver">
                Hemen Sipariş Ver
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
