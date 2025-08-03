"use client";
import { Award, Shield, CheckCircle, Star, Users, Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CertificatesSection from "../components/CertificatesSection";
import Footer from "../components/Footer";

export default function Sertifikalar() {
  return (
    <>
      <section className="flex flex-col items-center gap-12 min-h-[80vh] pb-12 w-full">
        {/* Hero Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-16 px-4 md:px-0 max-w-6xl mx-auto text-center md:text-left">
          <div className="flex-1 flex flex-col items-center md:items-start gap-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow mb-2 text-center md:text-left">
              Sertifikalarımız
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-medium mb-2 text-center md:text-left">
              Kalite ve hijyen standartlarımız uluslararası belgelerle onaylanmıştır. 
              Müşterilerimize en güvenli ve kaliteli hizmeti sunmak için sürekli kendimizi geliştiriyoruz.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>Uluslararası Standartlar</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Güvenilir</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span>Onaylı</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
            <div className="w-[180px] h-[120px] md:w-[320px] md:h-[220px] rounded-3xl shadow-2xl bg-gradient-to-tr from-primary/30 to-secondary/20 flex items-center justify-center">
              <span className="text-6xl">🏆</span>
            </div>
          </div>
        </div>

        {/* Kalite Güvencesi Kartı */}
        <div className="w-full max-w-6xl px-4">
          <Card className="bg-gradient-to-br from-background to-muted/20 border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-primary">Kalite Güvencesi</CardTitle>
              <CardDescription className="text-lg max-w-3xl mx-auto">
                Sertifikalarımız, müşterilerimize sunduğumuz hizmetin kalitesini ve güvenilirliğini garanti eder
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Hedef Odaklı</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sürekli iyileştirme hedefiyle çalışarak, en yüksek kalite standartlarını koruyoruz
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Müşteri Odaklı</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Müşteri memnuniyetini en üst seviyede tutmak için tüm süreçlerimizi optimize ediyoruz
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Mükemmellik</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Her aşamada mükemmellik arayışında olarak, en iyi hizmeti sunmaya odaklanıyoruz
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sertifika İstatistikleri */}
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                <h3 className="font-semibold text-lg mb-2">Aktif Sertifika</h3>
                <p className="text-sm text-muted-foreground">
                  Uluslararası standartlarda onaylanmış
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <h3 className="font-semibold text-lg mb-2">Uyumluluk</h3>
                <p className="text-sm text-muted-foreground">
                  Tüm kalite standartlarına uygun
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-purple-500">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <h3 className="font-semibold text-lg mb-2">Kalite Kontrol</h3>
                <p className="text-sm text-muted-foreground">
                  Sürekli denetim ve kontrol
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-orange-500">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">5+</div>
                <h3 className="font-semibold text-lg mb-2">Yıllık Deneyim</h3>
                <p className="text-sm text-muted-foreground">
                  Sektörde güvenilir hizmet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sertifikalar Bölümü */}
        <CertificatesSection />

        {/* Ek Bilgiler */}
        <div className="w-full max-w-6xl px-4">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-0">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary mb-2">Neden Sertifikalar Önemli?</h3>
                <p className="text-muted-foreground">
                  Sertifikalarımız, müşterilerimize sunduğumuz hizmetin kalitesini ve güvenilirliğini garanti eder
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Güvenilirlik</h4>
                      <p className="text-sm text-muted-foreground">
                        Sertifikalarımız, hizmet kalitemizin uluslararası standartlarda olduğunu kanıtlar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Şeffaflık</h4>
                      <p className="text-sm text-muted-foreground">
                        Tüm süreçlerimiz şeffaf ve denetlenebilir standartlarda yürütülür
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Sürekli İyileştirme</h4>
                      <p className="text-sm text-muted-foreground">
                        Kalite standartlarımızı sürekli geliştirerek en iyi hizmeti sunuyoruz
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Müşteri Memnuniyeti</h4>
                      <p className="text-sm text-muted-foreground">
                        Sertifikalarımız, müşteri memnuniyetinin en üst seviyede olmasını sağlar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </>
  );
} 