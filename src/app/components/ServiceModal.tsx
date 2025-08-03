"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const data = service ? serviceData[service] : null;

  if (!data) return null;

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-primary break-words">
              {data.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 p-6">
            {/* Fotoğraf Galerisi - Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.images.map((image, index) => (
                <div 
                  key={index} 
                  className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 hover:shadow-lg"
                  onClick={() => openImageModal(index)}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 mx-auto">
                      <span className="text-xl sm:text-2xl md:text-3xl">
                        {service === "organizasyon" ? "🍽️" : "❄️"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground break-words">
                      Fotoğraf {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Açıklama */}
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 break-words">Hakkında</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">
                {data.description}
              </p>
            </div>

            {/* Özellikler */}
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 break-words">Özelliklerimiz</h3>
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
        </DialogContent>
      </Dialog>

      {/* Fotoğraf Büyütme Modal */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={closeImageModal}>
        <DialogContent className="w-[80vw] max-w-sm max-h-[50vh] p-2 bg-black border-0">
          <div className="relative w-full flex items-center justify-center">
            <Carousel className="w-full">
              <CarouselContent>
                {data.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="bg-gradient-to-br from-primary/30 to-secondary/30 rounded-lg flex items-center justify-center p-2 min-h-[150px]">
                      <div className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mb-2 mx-auto shadow-lg">
                          <span className="text-lg sm:text-xl md:text-2xl">
                            {service === "organizasyon" ? "🍽️" : "❄️"}
                          </span>
                        </div>
                        <p className="text-xs text-white break-words font-medium">
                          Fotoğraf {index + 1}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-1 bg-black/60 border-white/30 text-white hover:bg-black/80 h-6 w-6" />
              <CarouselNext className="right-1 bg-black/60 border-white/30 text-white hover:bg-black/80 h-6 w-6" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 