"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Users, Snowflake, Shield, Calendar, Clock, Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import ServiceModal from "./components/ServiceModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<"organizasyon" | "soğuk-zincir" | null>(null);

  const openModal = (service: "organizasyon" | "soğuk-zincir") => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section className="relative flex flex-col items-center gap-12 min-h-[80vh] pb-12 w-full">
      {/* Hero Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-16 px-4 md:px-0 max-w-6xl mx-auto text-center md:text-left">
        <div className="flex-1 flex flex-col items-center md:items-start gap-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary drop-shadow mb-2 text-center md:text-left">
            YEMEKHANE
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium mb-2 text-center md:text-left">
            Organizasyon yemekleri ve soğuk zincir ürünlerinde <span className="text-primary font-bold">kalite</span> ve <span className="text-primary font-bold">hijyen</span> bir arada! Lezzetli menülerimiz ve profesyonel ekibimizle hizmetinizdeyiz.
          </p>
          <Link href="/menu" className="mt-2 px-8 py-4 rounded-full bg-primary text-background font-bold text-lg shadow-lg hover:bg-primary/90 transition">
            Günün Menüsüne Göz At
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
          {/* Hero görseli placeholder */}
          <div className="w-[220px] h-[160px] md:w-[400px] md:h-[280px] rounded-3xl shadow-2xl bg-gradient-to-tr from-primary/30 to-secondary/20 flex items-center justify-center">
            <span className="text-7xl">🍲</span>
          </div>
        </div>
      </div>
      
      {/* Günün Menüsü Kartı - Detaylı Tasarım */}
      <div className="w-full max-w-6xl px-4">
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
                <div className="bg-primary/90 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  15 Aralık 2024
                </div>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">4.8</span>
              </div>
            </div>

            {/* Sağ taraf - Menü detayları */}
            <CardContent className="p-4 sm:p-6 lg:p-8 order-1 lg:order-2">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                    Izgara Köfte
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg text-muted-foreground">
                    Ana Yemek
                  </CardDescription>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-muted/30">
                    <span className="font-medium text-sm sm:text-base">Yan Ürün</span>
                    <span className="text-muted-foreground text-sm sm:text-base">Pilav</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-muted/30">
                    <span className="font-medium text-sm sm:text-base">Salata</span>
                    <span className="text-muted-foreground text-sm sm:text-base">Mevsim Salata</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-muted/30">
                    <span className="font-medium text-sm sm:text-base">Tatlı</span>
                    <span className="text-muted-foreground text-sm sm:text-base">Sütlaç</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="font-medium text-sm sm:text-base">İçecek</span>
                    <span className="text-muted-foreground text-sm sm:text-base">Ayran</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-muted/30 gap-3">
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>25 dk</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>150 porsiyon</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-bold text-primary">₺45</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">porsiyon başına</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/menu" className="flex-1 bg-primary text-background font-semibold py-3 px-6 rounded-lg text-center hover:bg-primary/90 transition">
                    Menüyü İncele
                  </Link>
                  <Link href="/iletisim" className="flex-1 border border-primary text-primary font-semibold py-3 px-6 rounded-lg text-center hover:bg-primary/10 transition">
                    Rezervasyon Yap
                  </Link>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
      
      {/* Hizmet kartları - Modern tasarım */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {/* Organizasyon Yemekleri Kartı */}
        <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden p-0">
          <div className="relative overflow-hidden">
            <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Users className="w-16 h-16 text-primary" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-6 flex flex-col gap-4">
            <CardHeader className="p-0">
              <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors duration-200">
                Organizasyon Yemekleri
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Düğün, toplantı ve özel organizasyonlar için profesyonel yemek hizmeti.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Özel organizasyon menüleri</li>
                <li>• Profesyonel servis ekibi</li>
                <li>• Yerinde üretim imkanı</li>
              </ul>
            </CardContent>

            <CardFooter className="p-0">
              <button 
                onClick={() => openModal("organizasyon")}
                className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
              >
                <span>Detayları Gör</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </CardFooter>
          </div>
        </Card>

        {/* Soğuk Zincir Ürünleri Kartı */}
        <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden p-0">
          <div className="relative overflow-hidden">
            <div className="w-full h-48 bg-gradient-to-br from-chart-1/20 to-chart-1/10 flex items-center justify-center">
              <Snowflake className="w-16 h-16 text-chart-1" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-6 flex flex-col gap-4">
            <CardHeader className="p-0">
              <CardTitle className="text-xl leading-tight group-hover:text-chart-1 transition-colors duration-200">
                Soğuk Zincir Ürünleri
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Soğuk zincir korumalı, taze ve kaliteli ürünlerle hizmetinizdeyiz.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Soğuk zincir korumalı ürünler</li>
                <li>• Taze ve kaliteli malzemeler</li>
                <li>• Hijyenik paketleme</li>
              </ul>
            </CardContent>

            <CardFooter className="p-0">
              <button 
                onClick={() => openModal("soğuk-zincir")}
                className="flex items-center gap-1 text-sm font-medium text-chart-1 hover:text-chart-1/80 transition-colors duration-200"
              >
                <span>Detayları Gör</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </CardFooter>
          </div>
        </Card>

        {/* Hijyen & Kalite Kartı */}
        <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden p-0">
          <div className="relative overflow-hidden">
            <div className="w-full h-48 bg-gradient-to-br from-chart-2/20 to-chart-2/10 flex items-center justify-center">
              <Shield className="w-16 h-16 text-chart-2" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-6 flex flex-col gap-4">
            <CardHeader className="p-0">
              <CardTitle className="text-xl leading-tight group-hover:text-chart-2 transition-colors duration-200">
                Hijyen & Kalite
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Hijyen ve kalite belgeli mutfağımızda, güvenle yemek yiyin.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Kalite kontrol süreçleri</li>
                <li>• Uzman gıda mühendisleri</li>
                <li>• Belgelendirilmiş hijyen</li>
              </ul>
            </CardContent>
          </div>
        </Card>
      </div>
      
      {/* Vizyon & Misyon kartları yan yana ve başlık renkleri eşit */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-14 px-2">
        <div className="bg-card rounded-2xl shadow-lg p-8 border-l-4 border-primary flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-extrabold mb-2 text-primary">Vizyonumuz</h2>
          <p className="text-base text-muted-foreground">Sektörde öncü, yenilikçi ve güvenilir bir marka olmak.</p>
        </div>
        <div className="bg-card rounded-2xl shadow-lg p-8 border-l-4 border-primary flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-extrabold mb-2 text-primary">Misyonumuz</h2>
          <p className="text-base text-muted-foreground">Müşteri memnuyetini en üst seviyede tutmak, kaliteli ve güvenilir hizmet sunmak.</p>
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        service={selectedService} 
      />
    </section>
  );
}
