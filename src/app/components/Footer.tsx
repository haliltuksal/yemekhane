"use client";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-background to-muted/20 border-t border-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Yemekhane Logo"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-2xl font-bold text-primary">YEMEKHANE</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Organizasyon yemekleri ve soğuk zincir ürünlerinde kalite ve hijyen bir arada. 
              Lezzetli menülerimiz ve profesyonel ekibimizle hizmetinizdeyiz.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+90 530 868 51 45</span>
              </div>
            </div>
          </div>

          {/* Hızlı Erişim */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Hızlı Erişim</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Menü
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/sertifikalar" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sertifikalar
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Hizmetler */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Hizmetlerimiz</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                Organizasyon Yemekleri
              </li>
              <li className="text-sm text-muted-foreground">
                Soğuk Zincir Ürünleri
              </li>
              <li className="text-sm text-muted-foreground">
                Düğün & Toplantı
              </li>
              <li className="text-sm text-muted-foreground">
                Kurumsal Hizmetler
              </li>
              <li className="text-sm text-muted-foreground">
                Özel Menüler
              </li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>Hürriyet, Cengiz Topel Cd. No 79/81 C</p>
                  <p>34250 Gaziosmanpaşa/İstanbul</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+90 530 868 51 45</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">info@yemekhane.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Pzt-Cmt: 05:30–21:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sosyal Medya ve Telif Hakkı */}
        <div className="mt-12 pt-8 border-t border-muted/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Sosyal Medya */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Bizi takip edin:</span>
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.instagram.com/YOUR_INSTAGRAM_HANDLE" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://wa.me/YOUR_WHATSAPP_NUMBER" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Telif Hakkı */}
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p>&copy; {currentYear} Yemekhane. Tüm hakları saklıdır.</p>
              <p className="mt-1">Kalite ve hijyen garantisi ile hizmetinizdeyiz.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 