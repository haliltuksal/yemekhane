"use client";
import Link from "next/link";

export default function HeroSection() {
  return (
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
  );
} 