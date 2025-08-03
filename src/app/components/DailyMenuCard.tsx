"use client";
import Link from "next/link";
import { Calendar, Clock, Star, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function DailyMenuCard() {
  return (
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
  );
} 