import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Snowflake, 
  Truck, 
  Shield, 
  Clock, 
  Leaf, 
  Beef, 
  Fish, 
  Apple, 
  Milk, 
  IceCream,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";

export default function SogukZincirPage() {
  const productCategories = [
    {
      icon: Beef,
      title: "Et Ürünleri",
      description: "Taze dana, kuzu, tavuk ve hindi etleri",
      features: ["-18°C'de saklanır", "HACCP sertifikalı", "Günlük taze"]
    },
    {
      icon: Fish,
      title: "Deniz Ürünleri",
      description: "Balık, karides, midye ve diğer deniz mahsülleri",
      features: ["-20°C'de saklanır", "Soğuk zincir korunur", "Kalite garantili"]
    },
    {
      icon: Apple,
      title: "Taze Sebze-Meyve",
      description: "Mevsiminde toplanan organik ürünler",
      features: ["+2°C'de saklanır", "Günlük taze", "Organik sertifikalı"]
    },
    {
      icon: Milk,
      title: "Süt Ürünleri",
      description: "Süt, yoğurt, peynir ve krema",
      features: ["+4°C'de saklanır", "Günlük üretim", "Doğal içerik"]
    },
    {
      icon: IceCream,
      title: "Donmuş Ürünler",
      description: "Dondurma, donmuş pizza ve hazır yemekler",
      features: ["-18°C'de saklanır", "Uzun raf ömrü", "Pratik kullanım"]
    },
    {
      icon: Leaf,
      title: "Organik Ürünler",
      description: "Sertifikalı organik gıda ürünleri",
      features: ["Kontrollü sıcaklık", "Organik sertifika", "Doğal üretim"]
    }
  ];

  const advantages = [
    {
      icon: Shield,
      title: "Güvenli Kalite",
      description: "HACCP ve ISO standartlarında üretim ve saklama"
    },
    {
      icon: Clock,
      title: "7/24 Hizmet",
      description: "Kesintisiz soğuk zincir takibi ve acil sipariş imkanı"
    },
    {
      icon: Truck,
      title: "Hızlı Teslimat",
      description: "Özel soğuk zincir araçlarla güvenli taşıma"
    },
    {
      icon: Snowflake,
      title: "Sıcaklık Kontrolü",
      description: "Sürekli sıcaklık izleme ve kayıt sistemi"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Snowflake className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Soğuk Zincir
              <span className="block text-cyan-200">Ürünleri</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Gıda güvenliği ve kalite standartlarında, kesintisiz soğuk zincir ile 
              taze ve sağlıklı ürünler sunuyoruz. HACCP sertifikalı tesislerimizde 
              üretilen ürünler, özel araçlarla kapınıza kadar gelir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
                <Link href="/siparis-ver">
                  Hemen Sipariş Ver
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
                <Link href="/iletisim">
                  İletişime Geç
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              <Snowflake className="w-4 h-4 mr-2" />
              Ürün Kategorileri
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Geniş Ürün Yelpazesi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Her kategoride kaliteli ve güvenli ürünler, soğuk zincir korumasında 
              sizlere sunuluyor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {category.features.map((feature, featureIndex) => (
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
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soğuk zincir teknolojimiz ve kalite standartlarımızla 
              fark yaratıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-700 transition-colors">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Hemen Sipariş Verin
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Soğuk zincir ürünlerimizi deneyin, kalite farkını hissedin. 
            Online sipariş sistemimizle kolayca sipariş verebilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
              <Link href="/siparis-ver">
                Sipariş Ver
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
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
