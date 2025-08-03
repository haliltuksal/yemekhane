"use client";
import { Target, Eye, Heart, Shield, Users, Award, Clock, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "../components/Footer";

export default function Hakkimizda() {
  return (
    <>
      <section className="flex flex-col items-center gap-12 min-h-[80vh] pb-12 w-full">
        {/* Hero Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-16 px-4 md:px-0 max-w-6xl mx-auto text-center md:text-left">
          <div className="flex-1 flex flex-col items-center md:items-start gap-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow mb-2 text-center md:text-left">
              Hakkımızda
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-medium mb-2 text-center md:text-left">
              YEMEKHANE, toplu yemek ve catering sektöründe yılların tecrübesiyle hizmet vermektedir. 
              Amacımız, müşterilerimize hijyenik, sağlıklı ve lezzetli yemekler sunmaktır.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>Kalite Odaklı</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Güvenilir</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Müşteri Memnuniyeti</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
            <div className="w-[180px] h-[120px] md:w-[320px] md:h-[220px] rounded-3xl shadow-2xl bg-gradient-to-tr from-primary/30 to-secondary/20 flex items-center justify-center">
              <span className="text-6xl">👨‍🍳</span>
            </div>
          </div>
        </div>

        {/* Vizyon, Misyon ve Hedef Kartları */}
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Vizyon Kartı */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-500">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-blue-600">Vizyonumuz</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  Vizyonumuz, en leziz yemekleri kalitesiyle ve en uygun fiyatlarla sunmak, 
                  organizasyon yapımızı ve verdiğimiz hizmetin kalitesini geliştirmek ve 
                  böylelikle memnun müşteri sayımızı arttırmaktır.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Misyon Kartı */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-green-500">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-green-600">Misyonumuz</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  Misyonumuz, her damak zevkine uygun olan yemeklerimizi, doğru yerde, 
                  doğru hizmetle sunarak, yemek saatlerini bir keyfe dönüştürmek ve 
                  müşterilerimize bir çözüm ortağı olmaktır.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Hedef Kartı */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-purple-500">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-purple-600">Hedefimiz</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  Kaliteli ve güvenilir bir hizmet sunmak, müşteri memnuniyetinde sürekliliği 
                  sağlamak, gelişime açık ve tavizsiz kalite anlayışımız ile sektördeki 
                  yerimizi sağlamlaştırmaktır.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Şirket Politikası */}
        <div className="w-full max-w-6xl px-4">
          <Card className="bg-gradient-to-br from-background to-muted/20 border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-primary">Şirket Politikamız</CardTitle>
              <CardDescription className="text-lg max-w-3xl mx-auto">
                Yemekhane olarak, müşterilerimize en kaliteli hizmeti sunmak için belirlediğimiz temel prensipler
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Kalite ve Hijyen</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        En yüksek hijyen standartlarında üretim yaparak, müşterilerimize güvenli ve kaliteli yemekler sunuyoruz. 
                        Tüm süreçlerimiz uluslararası kalite standartlarına uygun olarak yürütülmektedir.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Müşteri Memnuniyeti</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Müşteri memnuniyetini en üst seviyede tutmak için sürekli kendimizi geliştiriyor, 
                        geri bildirimleri değerlendiriyor ve hizmet kalitemizi artırıyoruz.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Sürdürülebilirlik</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Çevreye duyarlı üretim süreçleri benimseyerek, atık yönetimi ve enerji tasarrufu 
                        konularında sürdürülebilir çözümler üretiyoruz.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">İnovasyon ve Gelişim</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Sektördeki yenilikleri takip ederek, teknolojik gelişmeleri hizmetlerimize entegre 
                        ediyor ve sürekli kendimizi yeniliyoruz.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Ekip Gelişimi</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Çalışanlarımızın sürekli eğitim ve gelişimini destekliyor, 
                        profesyonel yetkinliklerini artırmak için gerekli imkanları sağlıyoruz.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">6</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Toplumsal Sorumluluk</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Toplumsal sorumluluk bilinciyle hareket ederek, sosyal projelere destek veriyor 
                        ve toplumun gelişimine katkıda bulunuyoruz.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Değerlerimiz */}
        <div className="w-full max-w-6xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">Değerlerimiz</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Başarımızın temelinde yatan değerler ve prensiplerimiz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Sevgi</h3>
                <p className="text-sm text-muted-foreground">
                  Müşterilerimize ve işimize olan sevgimizle en iyi hizmeti sunuyoruz
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Güven</h3>
                <p className="text-sm text-muted-foreground">
                  Müşterilerimizin güvenini kazanmak ve korumak en önemli önceliğimiz
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Kalite</h3>
                <p className="text-sm text-muted-foreground">
                  Her aşamada en yüksek kalite standartlarını koruyoruz
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Takım Ruhu</h3>
                <p className="text-sm text-muted-foreground">
                  Birlikte çalışarak daha büyük başarılar elde ediyoruz
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </>
  );
} 