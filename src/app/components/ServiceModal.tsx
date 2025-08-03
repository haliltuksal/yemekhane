"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X } from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: "organizasyon" | "soğuk-zincir" | null;
}

const serviceData = {
  organizasyon: {
    title: "Organizasyon Yemekleri",
    description: "Düğün, toplantı ve özel organizasyonlar için profesyonel yemek hizmeti sunuyoruz. Deneyimli ekibimiz ve kaliteli malzemelerimizle unutulmaz lezzetler yaratıyoruz.",
    features: [
      "Özel organizasyon menüleri",
      "Profesyonel servis ekibi", 
      "Yerinde üretim imkanı",
      "Kişiye özel menü planlaması",
      "Hijyenik paketleme ve sunum"
    ],
    images: [
      { src: "/placeholder-org-1.jpg", alt: "Organizasyon yemekleri 1" },
      { src: "/placeholder-org-2.jpg", alt: "Organizasyon yemekleri 2" },
      { src: "/placeholder-org-3.jpg", alt: "Organizasyon yemekleri 3" },
      { src: "/placeholder-org-4.jpg", alt: "Organizasyon yemekleri 4" },
    ]
  },
  "soğuk-zincir": {
    title: "Soğuk Zincir Ürünleri", 
    description: "Soğuk zincir korumalı, taze ve kaliteli ürünlerle hizmetinizdeyiz. Ürünlerimiz özel soğuk zincir sistemleriyle korunarak tazeliğini korur.",
    features: [
      "Soğuk zincir korumalı ürünler",
      "Taze ve kaliteli malzemeler",
      "Hijyenik paketleme",
      "Sürekli sıcaklık kontrolü",
      "Hızlı teslimat"
    ],
    images: [
      { src: "/placeholder-cold-1.jpg", alt: "Soğuk zincir ürünleri 1" },
      { src: "/placeholder-cold-2.jpg", alt: "Soğuk zincir ürünleri 2" },
      { src: "/placeholder-cold-3.jpg", alt: "Soğuk zincir ürünleri 3" },
      { src: "/placeholder-cold-4.jpg", alt: "Soğuk zincir ürünleri 4" },
    ]
  }
};

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  const data = service ? serviceData[service] : null;

  if (!data) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] w-[90vw] max-w-5xl mx-auto p-4 sm:p-6 overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg sm:text-xl md:text-2xl font-bold text-primary break-words">
              {data.title}
            </SheetTitle>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-muted transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </SheetHeader>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Fotoğraf Galerisi */}
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {data.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto">
                          <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                            {service === "organizasyon" ? "🍽️" : "❄️"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground break-words">
                          {image.alt} - Fotoğraf {index + 1}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Açıklama */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 break-words">Hakkında</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">
              {data.description}
            </p>
          </div>

          {/* Özellikler */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 break-words">Özelliklerimiz</h3>
            <ul className="space-y-2">
              {data.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground break-words">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0 mt-1.5 sm:mt-2"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 