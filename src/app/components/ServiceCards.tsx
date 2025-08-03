"use client";
import { ArrowRight, Users, Snowflake, Shield } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface ServiceCardsProps {
  onOpenModal: (service: "organizasyon" | "soğuk-zincir") => void;
}

export default function ServiceCards({ onOpenModal }: ServiceCardsProps) {
  return (
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
              onClick={() => onOpenModal("organizasyon")}
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
              onClick={() => onOpenModal("soğuk-zincir")}
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
  );
} 