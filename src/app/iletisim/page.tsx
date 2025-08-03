"use client";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Users, Shield, Zap, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "../components/Footer";

export default function Iletisim() {
  return (
    <>
      <section className="flex flex-col items-center gap-12 min-h-[80vh] pb-12 w-full">
        {/* Hero Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-16 px-4 md:px-0 max-w-6xl mx-auto text-center md:text-left">
          <div className="flex-1 flex flex-col items-center md:items-start gap-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow mb-2 text-center md:text-left">
              İletişim
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-medium mb-2 text-center md:text-left">
              Bizimle iletişime geçin! Sorularınız, önerileriniz veya sipariş talepleriniz için 
              size yardımcı olmaktan mutluluk duyarız.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <span>7/24 Destek</span>
              </div>
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-green-500" />
                <span>Hızlı Yanıt</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Müşteri Odaklı</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
            <div className="w-[180px] h-[120px] md:w-[320px] md:h-[220px] rounded-3xl shadow-2xl bg-gradient-to-tr from-primary/30 to-secondary/20 flex items-center justify-center">
              <span className="text-6xl">📞</span>
            </div>
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Adres</h3>
                <p className="text-sm text-muted-foreground">
                  Hürriyet, Cengiz Topel Cd. No 79/81 C<br />
                  34250 Gaziosmanpaşa/İstanbul
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Telefon</h3>
                <p className="text-sm text-muted-foreground">
                  +90 530 868 51 45
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  7/24 Hizmet
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-purple-500">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">E-posta</h3>
                <p className="text-sm text-muted-foreground">
                  info@yemekhane.com
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Hızlı Yanıt
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-orange-500">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Çalışma Saatleri</h3>
                <p className="text-sm text-muted-foreground">
                  Pazartesi - Cumartesi<br />
                  05:30 - 21:00
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Pazar: Kapalı
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* İletişim Formu ve Harita */}
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* İletişim Formu */}
            <Card className="bg-gradient-to-br from-background to-muted/20 border-0 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-primary">Mesaj Gönderin</CardTitle>
                <CardDescription className="text-lg max-w-2xl mx-auto">
                  Sorularınız, önerileriniz veya sipariş talepleriniz için bizimle iletişime geçin
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Ad Soyad</label>
                      <Input 
                        type="text" 
                        placeholder="Adınız ve soyadınız"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">Telefon</label>
                      <Input 
                        type="tel" 
                        placeholder="+90 5XX XXX XX XX"
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">E-posta</label>
                    <Input 
                      type="email" 
                      placeholder="ornek@email.com"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Konu</label>
                    <Input 
                      type="text" 
                      placeholder="Mesajınızın konusu"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Mesaj</label>
                    <textarea 
                      placeholder="Mesajınızı buraya yazın..."
                      className="w-full min-h-[120px] px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    <Send className="w-4 h-4 mr-2" />
                    Mesaj Gönder
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Harita ve Ek Bilgiler */}
            <div className="space-y-6">
                             {/* Google Maps Haritası */}
               <Card className="border-0 shadow-xl">
                 <CardContent className="p-0">
                   <div className="aspect-[4/3] rounded-lg overflow-hidden">
                     <iframe 
                       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d752.0175767300244!2d28.904223569836425!3d41.06745580000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab1b3e5ca2ab3%3A0x50781f1ae1dbfb07!2sYemekhane!5e0!3m2!1str!2str!4v1754238405392!5m2!1str!2str" 
                       width="100%" 
                       height="100%" 
                       style={{border: 0}} 
                       allowFullScreen 
                       loading="lazy" 
                       referrerPolicy="no-referrer-when-downgrade"
                       title="Yemekhane Konumu"
                       className="w-full h-full"
                     />
                   </div>
                 </CardContent>
               </Card>

              {/* Hızlı İletişim */}
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-4">Hızlı İletişim</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Acil Sipariş</p>
                        <p className="text-xs text-muted-foreground">Hemen arayın</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">WhatsApp</p>
                        <p className="text-xs text-muted-foreground">Hızlı mesaj</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">E-posta</p>
                        <p className="text-xs text-muted-foreground">Detaylı bilgi</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Hizmet Avantajları */}
        <div className="w-full max-w-6xl px-4">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-0">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">Neden Bizi Tercih Edin?</h3>
                <p className="text-muted-foreground">
                  Müşteri memnuniyeti odaklı hizmet anlayışımızla sizlere en iyi deneyimi sunuyoruz
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Müşteri Odaklı</h4>
                  <p className="text-sm text-muted-foreground">
                    Her müşterinin ihtiyacına özel çözümler sunuyoruz
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Güvenilir</h4>
                  <p className="text-sm text-muted-foreground">
                    Kaliteli ve güvenilir hizmet garantisi
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Hızlı</h4>
                  <p className="text-sm text-muted-foreground">
                    Hızlı yanıt ve teslimat süreleri
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Samimi</h4>
                  <p className="text-sm text-muted-foreground">
                    Sıcak ve samimi müşteri ilişkileri
                  </p>
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