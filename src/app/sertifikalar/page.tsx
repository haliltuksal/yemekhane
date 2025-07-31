export default function Sertifikalar() {
  return (
    <section className="flex flex-col items-center gap-12 min-h-[80vh] pb-12 w-full">
      {/* Hero Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 py-12 px-4 md:px-0 max-w-6xl mx-auto text-center md:text-left">
        <div className="flex-1 flex flex-col items-center md:items-start gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow mb-2 text-center md:text-left">Sertifikalarımız</h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-medium mb-2 text-center md:text-left">YEMEKHANE olarak kalite ve hijyen belgelerimizle güvenle hizmet veriyoruz.</p>
        </div>
        <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
          <div className="w-[180px] h-[120px] md:w-[320px] md:h-[220px] rounded-3xl shadow-2xl bg-gradient-to-tr from-primary/30 to-secondary/20 flex items-center justify-center">
            <span className="text-6xl">📜</span>
          </div>
        </div>
      </div>
      {/* Sertifika kartları */}
      <div className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 px-2">
        <div className="p-8 rounded-2xl shadow-xl bg-card flex flex-col items-center border border-primary/20 text-center">
          <span className="text-4xl mb-2">📜</span>
          <h3 className="font-bold text-lg mb-1">Hizmet Sertifikası</h3>
          <p className="text-muted-foreground text-center">Yemek üretiminde kalite ve güvenin göstergesi olan hizmet sertifikamız.</p>
        </div>
        <div className="p-8 rounded-2xl shadow-xl bg-card flex flex-col items-center border border-primary/20 text-center">
          <span className="text-4xl mb-2">🧼</span>
          <h3 className="font-bold text-lg mb-1">Hijyen Sertifikası</h3>
          <p className="text-muted-foreground text-center">Tesisimizde hijyen standartlarına uygun üretim yaptığımızı belgeleyen hijyen sertifikamız.</p>
        </div>
      </div>
    </section>
  );
} 