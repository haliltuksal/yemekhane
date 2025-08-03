"use client";
import { useState } from "react";
import { Award, Shield, CheckCircle, X, ZoomIn } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);

  const certificates = [
    {
      id: 1,
      title: "ISO 22000 Gıda Güvenliği",
      description: "Gıda güvenliği yönetim sistemi belgesi",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      placeholder: "🍽️",
      imageUrl: "/certificate-iso22000.jpg", // Sertifika geldiğinde buraya eklenecek
    },
    {
      id: 2,
      title: "HACCP Belgesi",
      description: "Tehlike analizi ve kritik kontrol noktaları",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      placeholder: "✅",
      imageUrl: "/certificate-haccp.jpg", // Sertifika geldiğinde buraya eklenecek
    },
    {
      id: 3,
      title: "Kalite Yönetim Sistemi",
      description: "ISO 9001 kalite yönetim sistemi belgesi",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      placeholder: "🏆",
      imageUrl: "/certificate-iso9001.jpg", // Sertifika geldiğinde buraya eklenecek
    },
  ];

  const openCertificateModal = (certId: number) => {
    setSelectedCertificate(certId);
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };

  const selectedCert = certificates.find(cert => cert.id === selectedCertificate);

  return (
    <>
      <div className="w-full max-w-6xl px-4 mt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Sertifikalarımız
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kalite ve hijyen standartlarımız uluslararası belgelerle onaylanmıştır
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificates.map((cert) => {
            const IconComponent = cert.icon;
            return (
              <Card 
                key={cert.id} 
                className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden border-2 ${cert.borderColor} hover:border-primary/50`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-12 h-12 ${cert.bgColor} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${cert.color}`} />
                    </div>
                    <div className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                      {cert.placeholder}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-primary">
                    {cert.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {cert.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Sertifika Fotoğrafı Placeholder */}
                  <div 
                    className="relative aspect-[4/3] bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center group-hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => openCertificateModal(cert.id)}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2 opacity-50 group-hover:opacity-70 transition-opacity">
                        📄
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Sertifika Fotoğrafı
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        Buraya gelecek
                      </p>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary flex items-center gap-1">
                        <ZoomIn className="w-3 h-3" />
                        Görüntüle
                      </div>
                    </div>
                  </div>
                  
                  {/* Sertifika Detayları */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Belge No:</span>
                      <span className="font-mono">ISO-{cert.id}2024</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Geçerlilik:</span>
                      <span>2024-2027</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Durum:</span>
                      <span className="flex items-center gap-1 text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Aktif
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Alt Bilgi */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Tüm sertifikalarımız güncel ve geçerlidir
            </span>
          </div>
        </div>
      </div>

      {/* Sertifika Görüntüleme Modal */}
      <Dialog open={selectedCertificate !== null} onOpenChange={closeCertificateModal}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 bg-black border-0">
          <DialogHeader className="p-4 bg-black/90 border-b border-white/10">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-white text-lg font-semibold">
                {selectedCert?.title}
              </DialogTitle>
              <button
                onClick={closeCertificateModal}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto p-4">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-50">
                  📄
                </div>
                <p className="text-white font-medium mb-2">
                  Sertifika Fotoğrafı
                </p>
                <p className="text-white/70 text-sm">
                  Sertifika geldiğinde burada görünecek
                </p>
                <div className="mt-4 text-xs text-white/50">
                  <p>Belge No: {selectedCert?.id ? `ISO-${selectedCert.id}2024` : ''}</p>
                  <p>Geçerlilik: 2024-2027</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 