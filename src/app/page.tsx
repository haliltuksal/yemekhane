import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Calendar, CreditCard, Wallet, Shield, Zap } from "lucide-react";

export default function Home() {
  // Örnek günün menüsü verisi
  const todaysMenu = {
    date: "15 Aralık 2024",
    mainCourse: "Izgara Köfte",
    sideDish: "Pilav",
    salad: "Mevsim Salata",
    dessert: "Sütlaç",
    drink: "Ayran",
    price: "₺45",
    image: "/menu-example.jpg", // Örnek fotoğraf
    rating: 4.8,
    servings: 150,
    prepTime: "25 dk"
  };

  return (
    <div className="min-h-screen">
      {/* Günün Menüsü Section */}
      <section className="py-16 px-4 md:px-0 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Günün Menüsü
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Her gün taze ve lezzetli menülerimizi keşfedin. Kaliteli malzemeler ve uzman şeflerimizle hazırlanan özel tarifler.
          </p>
        </div>

        {/* Günün Menüsü Kartı */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-background to-muted/20">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
              {/* Sol taraf - Menü fotoğrafı */}
              <div className="relative h-64 lg:h-full min-h-[300px] order-2 lg:order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                      <span className="text-6xl md:text-8xl">🍽️</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Menü fotoğrafı burada görünecek</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-primary/90 text-white text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {todaysMenu.date}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{todaysMenu.rating}</span>
                </div>
              </div>

              {/* Sağ taraf - Menü detayları */}
              <CardContent className="p-4 sm:p-6 lg:p-8 order-1 lg:order-2">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                      {todaysMenu.mainCourse}
                    </CardTitle>
                    <CardDescription className="text-base sm:text-lg text-muted-foreground">
                      Ana Yemek
                    </CardDescription>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-muted/30">
                      <span className="font-medium text-sm sm:text-base">Yan Ürün</span>
                      <span className="text-muted-foreground text-sm sm:text-base">{todaysMenu.sideDish}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-muted/30">
                      <span className="font-medium text-sm sm:text-base">Salata</span>
                      <span className="text-muted-foreground text-sm sm:text-base">{todaysMenu.salad}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-muted/30">
                      <span className="font-medium text-sm sm:text-base">Tatlı</span>
                      <span className="text-muted-foreground text-sm sm:text-base">{todaysMenu.dessert}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium text-sm sm:text-base">İçecek</span>
                      <span className="text-muted-foreground text-sm sm:text-base">{todaysMenu.drink}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-muted/30 gap-3">
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{todaysMenu.prepTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{todaysMenu.servings} porsiyon</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-bold text-primary">{todaysMenu.price}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">porsiyon başına</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button className="flex-1" size="lg">
                      Menüyü İncele
                    </Button>
                    <Button variant="outline" size="lg">
                      Rezervasyon Yap
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Ödeme Yöntemleri Section */}
      <section className="py-16 px-4 md:px-0 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-muted/30 to-background rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Güvenli Ödeme Seçenekleri
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tüm ödeme yöntemlerini kabul ediyoruz. Güvenli ve hızlı ödeme ile hizmetinizdeyiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Kredi Kartları */}
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-primary/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold mb-4">Kredi Kartları</CardTitle>
              <div className="flex justify-center items-center gap-3">
                <Image
                  src="/visa-2014-2021-logo-brandlogos.net_7ldal618h.svg"
                  alt="Visa"
                  width={40}
                  height={25}
                  className="h-6 w-auto"
                />
                <Image
                  src="/mastercard-logo-O88F55Erg_brandlogos.net.svg"
                  alt="Mastercard"
                  width={40}
                  height={25}
                  className="h-6 w-auto"
                />
              </div>
            </Card>

            {/* Yemek Kartları */}
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-primary/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold mb-4">Yemek Kartları</CardTitle>
              <div className="grid grid-cols-2 gap-2">
                <Image
                  src="/Edenred-OQcGHjGD0_brandlogos.net.svg"
                  alt="Edenred"
                  width={60}
                  height={30}
                  className="h-6 w-auto mx-auto"
                />
                <Image
                  src="/multinet-vector-logo.png"
                  alt="Multinet"
                  width={60}
                  height={30}
                  className="h-10 w-auto mx-auto"
                />
                <Image
                  src="/sodexo-logo-brandlogos.net_exyeecrvx.svg"
                  alt="Sodexo"
                  width={60}
                  height={30}
                  className="h-6 w-auto mx-auto"
                />
                <Image
                  src="/ticket-restaurant-logo-brandlogos.net_vknv0axmd.svg"
                  alt="Ticket Restaurant"
                  width={60}
                  height={30}
                  className="h-6 w-auto mx-auto"
                />
              </div>
            </Card>

            {/* Dijital Cüzdanlar */}
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-primary/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold mb-4">Dijital Cüzdanlar</CardTitle>
              <div className="flex justify-center items-center gap-3">
                <Image
                  src="/Apple_Pay-OjtRq7STf_brandlogos.net.svg"
                  alt="Apple Pay"
                  width={50}
                  height={30}
                  className="h-6 w-auto"
                />
                <Image
                  src="/g-pay-logo-brandlogos.net_m2s30kmwb.svg"
                  alt="Google Pay"
                  width={50}
                  height={30}
                  className="h-6 w-auto"
                />
              </div>
            </Card>

            {/* Nakit */}
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-primary/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold mb-2">Nakit & Havale</CardTitle>
              <CardDescription className="text-sm">
                Güvenli nakit ödeme ve banka havalesi
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Hizmet kartları */}
      <section className="py-16 px-4 md:px-0 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 text-center hover:shadow-xl transition-shadow border-primary/20">
            <div className="text-5xl mb-4">🍽️</div>
            <CardTitle className="text-2xl mb-3 text-primary">Toplu Yemek</CardTitle>
            <CardDescription className="text-base mb-4">
              Şirketlere, fabrikalara ve okullara sağlıklı, lezzetli toplu yemek hizmeti.
            </CardDescription>
            <ul className="text-sm text-muted-foreground list-disc pl-4 text-left space-y-1">
              <li>Günlük taze üretim</li>
              <li>Farklı menü seçenekleri</li>
              <li>Yerinde üretim imkanı</li>
            </ul>
          </Card>

          <Card className="p-8 text-center hover:shadow-xl transition-shadow border-primary/20">
            <div className="text-5xl mb-4">🥗</div>
            <CardTitle className="text-2xl mb-3 text-primary">Catering</CardTitle>
            <CardDescription className="text-base mb-4">
              Düğün, davet ve özel günler için profesyonel catering çözümleri.
            </CardDescription>
            <ul className="text-sm text-muted-foreground list-disc pl-4 text-left space-y-1">
              <li>Özel gün menüleri</li>
              <li>Profesyonel servis ekibi</li>
              <li>Hijyenik sunum</li>
            </ul>
          </Card>

          <Card className="p-8 text-center hover:shadow-xl transition-shadow border-primary/20">
            <div className="text-5xl mb-4">🧼</div>
            <CardTitle className="text-2xl mb-3 text-primary">Hijyen & Kalite</CardTitle>
            <CardDescription className="text-base mb-4">
              Hijyen ve kalite belgeli mutfağımızda, güvenle yemek yiyin.
            </CardDescription>
            <ul className="text-sm text-muted-foreground list-disc pl-4 text-left space-y-1">
              <li>Kalite kontrol süreçleri</li>
              <li>Uzman gıda mühendisleri</li>
              <li>Belgelendirilmiş hijyen</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Vizyon & Misyon */}
      <section className="py-16 px-4 md:px-0 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 border-l-4 border-primary">
            <CardTitle className="text-2xl font-bold text-primary mb-4">Vizyonumuz</CardTitle>
            <CardDescription className="text-base">
              Sektörde öncü, yenilikçi ve güvenilir bir marka olmak. Müşterilerimize en kaliteli hizmeti sunarak, toplu yemek sektöründe standartları yükseltmek.
            </CardDescription>
          </Card>

          <Card className="p-8 border-l-4 border-primary">
            <CardTitle className="text-2xl font-bold text-primary mb-4">Misyonumuz</CardTitle>
            <CardDescription className="text-base">
              Müşteri memnuniyetini en üst seviyede tutmak, kaliteli ve güvenilir hizmet sunmak. Sağlıklı ve lezzetli yemeklerle insanların yaşam kalitesini artırmak.
            </CardDescription>
          </Card>
        </div>
      </section>
    </div>
  );
}
