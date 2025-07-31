export default function Iletisim() {
  return (
    <section className="flex flex-col items-center gap-12 min-h-[80vh] pb-12 w-full">
      {/* Hero Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-12 px-4 md:px-0 max-w-6xl mx-auto">
        <div className="flex-1 flex flex-col items-start gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow mb-2">İletişim</h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-xl font-medium mb-2">Bizimle iletişime geçmek için aşağıdaki formu doldurabilir veya iletişim bilgilerimizi kullanabilirsiniz.</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-[220px] h-[160px] md:w-[320px] md:h-[220px] rounded-3xl shadow-2xl bg-gradient-to-tr from-primary/30 to-secondary/20 flex items-center justify-center">
            <span className="text-6xl">☎️</span>
          </div>
        </div>
      </div>
      {/* İletişim bilgileri ve form */}
      <div className="max-w-xl w-full flex flex-col gap-8 mt-4">
        <div className="space-y-2 text-muted-foreground bg-card rounded-lg shadow p-6">
          <div><span className="font-semibold text-foreground">Telefon:</span> 0 (555) 123 45 67</div>
          <div><span className="font-semibold text-foreground">E-posta:</span> info@yemekhane.com</div>
          <div><span className="font-semibold text-foreground">Adres:</span> İstanbul, Türkiye</div>
        </div>
        <form className="bg-card rounded-lg shadow p-6 flex flex-col gap-4">
          <input type="text" placeholder="Adınız" className="border rounded px-4 py-2 focus:outline-none focus:ring" />
          <input type="email" placeholder="E-posta" className="border rounded px-4 py-2 focus:outline-none focus:ring" />
          <textarea placeholder="Mesajınız" rows={4} className="border rounded px-4 py-2 focus:outline-none focus:ring" />
          <button type="submit" className="bg-primary text-background font-semibold rounded px-6 py-2 hover:bg-primary/90 transition">Gönder</button>
        </form>
      </div>
    </section>
  );
} 