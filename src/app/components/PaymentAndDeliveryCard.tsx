"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function PaymentAndDeliveryCard() {
  return (
    <div className="w-full max-w-6xl px-4 mt-8">
      <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="p-6 pb-4">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-primary text-center">
            Ödeme ve Sipariş Seçenekleri
          </CardTitle>
          <CardDescription className="text-base sm:text-lg text-muted-foreground text-center">
            Güvenli ödeme yöntemleri ve popüler sipariş platformlarıyla hizmetinizdeyiz
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 pt-0 space-y-8">
          {/* Ödeme Seçenekleri */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-4 text-center">Ödeme Yöntemleri</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Kredi Kartları */}
              <div className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                <img src="/visa-2014-2021-logo-brandlogos.net_7ldal618h.svg" alt="Visa" className="h-8 w-auto" />
                <span className="text-xs text-muted-foreground">Visa</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                <img src="/mastercard-logo-O88F55Erg_brandlogos.net.svg" alt="Mastercard" className="h-8 w-auto" />
                <span className="text-xs text-muted-foreground">Mastercard</span>
              </div>
              
              {/* Yemek Kartları */}
              <div className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                <img src="/multinet-vector-logo.png" alt="Multinet" className="h-12 w-auto" />
                <span className="text-xs text-muted-foreground">Multinet</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                <img src="/ticket-restaurant-logo-brandlogos.net_vknv0axmd.svg" alt="Ticket Restaurant" className="h-8 w-auto" />
                <span className="text-xs text-muted-foreground">Ticket Restaurant</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                <img src="/sodexo-logo-brandlogos.net_exyeecrvx.svg" alt="Sodexo" className="h-8 w-auto" />
                <span className="text-xs text-muted-foreground">Sodexo</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                <img src="/Edenred-OQcGHjGD0_brandlogos.net.svg" alt="Edenred" className="h-8 w-auto" />
                <span className="text-xs text-muted-foreground">Edenred</span>
              </div>
            </div>
          </div>

          {/* Ayırıcı Çizgi */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">&nbsp;&nbsp;</span>
            </div>
          </div>

          {/* Sipariş Platformları */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-4 text-center">Sipariş Platformları</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Yemek Sepeti */}
              <div className="flex flex-col items-center gap-4 p-6 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer">
                <img src="/yemek-sepeti-vector-logo.png" alt="Yemek Sepeti" className="h-16 w-auto" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary">Yemek Sepeti</h3>
                  <p className="text-sm text-muted-foreground">Hızlı teslimat</p>
                </div>
              </div>
              
              {/* Getir */}
              <div className="flex flex-col items-center gap-4 p-6 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer">
                <img src="/getir-logo-brandlogos.net_hdbwb0ch1.svg" alt="Getir" className="h-16 w-auto" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary">Getir</h3>
                  <p className="text-sm text-muted-foreground">Dakikalar içinde</p>
                </div>
              </div>
              
              {/* Trendyol Go */}
              <div className="flex flex-col items-center gap-4 p-6 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer">
                <img src="/trendyol-go-logo-brandlogos.net_hp1vmrk1s.svg" alt="Trendyol Go" className="h-16 w-auto" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary">Trendyol Go</h3>
                  <p className="text-sm text-muted-foreground">Süper hızlı</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 