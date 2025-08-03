"use client";
import { useState } from "react";
import ServiceModal from "./components/ServiceModal";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import DailyMenuCard from "./components/DailyMenuCard";
import ServiceCards from "./components/ServiceCards";
import CertificatesSection from "./components/CertificatesSection";
import PaymentAndDeliveryCard from "./components/PaymentAndDeliveryCard";

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
    <>
      <section className="relative flex flex-col items-center gap-12 min-h-[80vh] pb-12 w-full">
        
        {/* Günün Menüsü Kartı */}
        <DailyMenuCard />
        
        {/* Hizmet kartları */}
        <ServiceCards onOpenModal={openModal} />
        
        {/* Sertifikalar Bölümü */}
        <CertificatesSection />
        
        {/* Ödeme ve Sipariş Seçenekleri Kartı */}
        <PaymentAndDeliveryCard />
        
        {/* Service Modal */}
        <ServiceModal 
          isOpen={modalOpen} 
          onClose={closeModal} 
          service={selectedService} 
        />
      </section>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
