"use client";
import { Calendar, Clock, Star, Users, ChefHat, Utensils, Coffee, Heart, Zap, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DailyMenuCard from "../components/DailyMenuCard";
import Footer from "../components/Footer";

export default function Menu() {
  return (
    <>
      <section className="flex flex-col items-center gap-12 min-h-[80vh] pb-12 w-full">
        {/* Hero Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-16 px-4 md:px-0 max-w-6xl mx-auto text-center md:text-left">
          <div className="flex-1 flex flex-col items-center md:items-start gap-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow mb-2 text-center md:text-left">
              Günün Menüsü
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-medium mb-2 text-center md:text-left">
              Her gün taze ve lezzetli yemeklerimizi keşfedin. Şeflerimizin özenle hazırladığı 
              menülerimizle damak zevkinize hitap eden bir deneyim yaşayın.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-orange-500" />
                <span>Şef Özel</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-green-500" />
                <span>Taze Malzeme</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Lezzet Garantisi</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
            <div className="w-[180px] h-[120px] md:w-[320px] md:h-[220px] rounded-3xl shadow-2xl bg-gradient-to-tr from-primary/30 to-secondary/20 flex items-center justify-center">
              <span className="text-6xl">🍽️</span>
            </div>
          </div>
        </div>

        {/* Menü Özellikleri */}
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-orange-500">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Uzman Şefler</h3>
                <p className="text-sm text-muted-foreground">
                  Deneyimli şeflerimiz tarafından özenle hazırlanan menüler
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Hijyen Garantisi</h3>
                <p className="text-sm text-muted-foreground">
                  En yüksek hijyen standartlarında hazırlanan yemekler
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-purple-500">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Hızlı Servis</h3>
                <p className="text-sm text-muted-foreground">
                  Sıcak ve taze yemeklerin hızlı servisi
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Günün Menüsü Kartı */}
        <DailyMenuCard />

        {/* Menü Kategorileri */}
        <div className="w-full max-w-6xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">Menü Kategorileri</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Farklı damak zevklerine hitap eden çeşitli menü seçeneklerimiz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🍖</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Ana Yemekler</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Et, tavuk, balık ve vejetaryen seçenekleri
                </p>
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span>Popüler</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>15-20 dk</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🥗</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Salatalar</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Taze sebzeler ve sağlıklı soslarla
                </p>
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Heart className="w-3 h-3 text-red-500" />
                    <span>Sağlıklı</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>5-10 dk</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🍰</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Tatlılar</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ev yapımı lezzetli tatlılar
                </p>
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span>Özel</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Hazır</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🥤</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">İçecekler</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Soğuk ve sıcak içecek seçenekleri
                </p>
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Coffee className="w-3 h-3 text-brown-500" />
                    <span>Taze</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Anında</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Menü Avantajları */}
        <div className="w-full max-w-6xl px-4">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-0">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">Menü Avantajlarımız</h3>
                <p className="text-muted-foreground">
                  Günlük menülerimizde sizleri bekleyen özel avantajlar
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Günlük Güncelleme</h4>
                    <p className="text-sm text-muted-foreground">
                      Her gün taze ve farklı menü seçenekleri
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Toplu Sipariş</h4>
                    <p className="text-sm text-muted-foreground">
                      Şirket ve organizasyonlar için özel menüler
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Kalite Garantisi</h4>
                    <p className="text-sm text-muted-foreground">
                      En kaliteli malzemelerle hazırlanan yemekler
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Hızlı Teslimat</h4>
                    <p className="text-sm text-muted-foreground">
                      Sıcak ve taze yemeklerin zamanında teslimatı
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Müşteri Memnuniyeti</h4>
                    <p className="text-sm text-muted-foreground">
                      %100 müşteri memnuniyeti garantisi
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Özel Menüler</h4>
                    <p className="text-sm text-muted-foreground">
                      Diyet ve özel beslenme ihtiyaçları için
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rezervasyon CTA */}
        <div className="w-full max-w-6xl px-4">
          <Card className="bg-gradient-to-r from-primary to-primary/90 text-white border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <span className="text-4xl">📞</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Menü Rezervasyonu</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Günlük menülerimizi önceden rezerve edin ve lezzetli yemeklerinizi garantileyin. 
                Toplu siparişler için özel fiyatlandırma ve hızlı teslimat seçenekleri.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  Hemen Rezervasyon Yap
                </button>
                <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors">
                  Menü Detayları
                </button>
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