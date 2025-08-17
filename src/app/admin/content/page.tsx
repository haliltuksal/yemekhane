"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Award, 
  Home, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Save,
  Upload,
  Trash2,
  Edit,
  Plus
} from "lucide-react";

interface ContentData {
  about: {
    title: string;
    content: string;
    mission: string;
    vision: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    features: string[];
  };
  footer: {
    address: string;
    phone: string;
    email: string;
    socialMedia: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
}

interface Certificate {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
}

export default function ContentManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<ContentData>({
    about: {
      title: "Hakkımızda",
      content: "Yemekhane olarak müşterilerimize en kaliteli yemek hizmetini sunuyoruz...",
      mission: "Müşteri memnuniyeti odaklı hizmet",
      vision: "Sektörde lider konuma ulaşmak"
    },
    home: {
      heroTitle: "Modern Yemek Hizmetleri",
      heroSubtitle: "Kaliteli, hijyenik ve lezzetli yemekler",
      features: ["Hızlı Teslimat", "Kaliteli Malzeme", "Uygun Fiyat"]
    },
    footer: {
      address: "İstanbul, Türkiye",
      phone: "+90 212 123 45 67",
      email: "info@yemekhane.com",
      socialMedia: {}
    }
  });
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user.role !== "ADMIN") {
      router.push("/admin/login");
      return;
    }

    fetchContent();
    fetchCertificates();
  }, [session, status, router]);

  const fetchContent = async () => {
    try {
      // TODO: API endpoint'ten içerik çek
      setLoading(false);
    } catch (error) {
      console.error('İçerik yüklenemedi:', error);
      setLoading(false);
    }
  };

  const fetchCertificates = async () => {
    try {
      // TODO: API endpoint'ten sertifikaları çek
      setCertificates([
        {
          id: '1',
          name: 'ISO 9001 Kalite Belgesi',
          description: 'Kalite yönetim sistemi belgesi',
          imageUrl: '/certificates/iso9001.jpg',
          isActive: true
        }
      ]);
    } catch (error) {
      console.error('Sertifikalar yüklenemedi:', error);
    }
  };

  const saveContent = async (section: keyof ContentData) => {
    setSaving(true);
    try {
      // TODO: API endpoint'e kaydet
      console.log(`${section} içeriği kaydedildi`);
      setTimeout(() => setSaving(false), 1000);
    } catch (error) {
      console.error('İçerik kaydedilemedi:', error);
      setSaving(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: File upload API'si
      console.log('Dosya yüklendi:', file.name);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">İçerik Yönetimi</h1>
        <Button onClick={() => router.push('/admin')}>
          ← Dashboard'a Dön
        </Button>
      </div>

      <Tabs defaultValue="about" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="about">Hakkımızda</TabsTrigger>
          <TabsTrigger value="home">Anasayfa</TabsTrigger>
          <TabsTrigger value="certificates">Sertifikalar</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        {/* Hakkımızda Editörü */}
        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Hakkımızda Sayfası
              </CardTitle>
              <CardDescription>
                Hakkımızda sayfasının içeriğini düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Başlık</label>
                <Input
                  value={content.about.title}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    about: { ...prev.about, title: e.target.value }
                  }))}
                  placeholder="Hakkımızda"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Ana İçerik</label>
                <Textarea
                  value={content.about.content}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    about: { ...prev.about, content: e.target.value }
                  }))}
                  placeholder="Hakkımızda içeriği..."
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Misyon</label>
                  <Textarea
                    value={content.about.mission}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      about: { ...prev.about, mission: e.target.value }
                    }))}
                    placeholder="Misyonumuz..."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Vizyon</label>
                  <Textarea
                    value={content.about.vision}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      about: { ...prev.about, vision: e.target.value }
                    }))}
                    placeholder="Vizyonumuz..."
                    rows={3}
                  />
                </div>
              </div>

              <Button 
                onClick={() => saveContent('about')} 
                disabled={saving}
                className="w-full"
              >
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Anasayfa İçerikleri */}
        <TabsContent value="home" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Anasayfa İçerikleri
              </CardTitle>
              <CardDescription>
                Anasayfa hero section ve özelliklerini düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Hero Başlık</label>
                <Input
                  value={content.home.heroTitle}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    home: { ...prev.home, heroTitle: e.target.value }
                  }))}
                  placeholder="Ana başlık"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Hero Alt Başlık</label>
                <Input
                  value={content.home.heroSubtitle}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    home: { ...prev.home, heroSubtitle: e.target.value }
                  }))}
                  placeholder="Alt başlık"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Özellikler</label>
                {content.home.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...content.home.features];
                        newFeatures[index] = e.target.value;
                        setContent(prev => ({
                          ...prev,
                          home: { ...prev.home, features: newFeatures }
                        }));
                      }}
                      placeholder={`Özellik ${index + 1}`}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newFeatures = content.home.features.filter((_, i) => i !== index);
                        setContent(prev => ({
                          ...prev,
                          home: { ...prev.home, features: newFeatures }
                        }));
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setContent(prev => ({
                    ...prev,
                    home: { ...prev.home, features: [...prev.home.features, ''] }
                  }))}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Özellik Ekle
                </Button>
              </div>

              <Button 
                onClick={() => saveContent('home')} 
                disabled={saving}
                className="w-full"
              >
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sertifika Yönetimi */}
        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Sertifika Yönetimi
              </CardTitle>
              <CardDescription>
                Sertifikaları yükleyin, düzenleyin ve yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Sertifika dosyasını yüklemek için tıklayın
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="certificate-upload"
                />
                <label htmlFor="certificate-upload">
                  <Button variant="outline" asChild>
                    <span>Dosya Seç</span>
                  </Button>
                </label>
              </div>

              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Award className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">{cert.name}</h4>
                          <p className="text-sm text-gray-600">{cert.description}</p>
                          <Badge variant={cert.isActive ? "default" : "secondary"}>
                            {cert.isActive ? "Aktif" : "Pasif"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Bilgileri */}
        <TabsContent value="footer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Footer Bilgileri
              </CardTitle>
              <CardDescription>
                Footer'da görünecek iletişim ve sosyal medya bilgilerini düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Adres</label>
                  <Input
                    value={content.footer.address}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      footer: { ...prev.footer, address: e.target.value }
                    }))}
                    placeholder="Şirket adresi"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Telefon</label>
                  <Input
                    value={content.footer.phone}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      footer: { ...prev.footer, phone: e.target.value }
                    }))}
                    placeholder="+90 212 123 45 67"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">E-posta</label>
                <Input
                  value={content.footer.email}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    footer: { ...prev.footer, email: e.target.value }
                  }))}
                  placeholder="info@yemekhane.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sosyal Medya Linkleri</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-gray-600">Facebook</label>
                    <Input
                      value={content.footer.socialMedia.facebook || ''}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          socialMedia: {
                            ...prev.footer.socialMedia,
                            facebook: e.target.value
                          }
                        }
                      }))}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Instagram</label>
                    <Input
                      value={content.footer.socialMedia.instagram || ''}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          socialMedia: {
                            ...prev.footer.socialMedia,
                            instagram: e.target.value
                          }
                        }
                      }))}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Twitter</label>
                    <Input
                      value={content.footer.socialMedia.twitter || ''}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          socialMedia: {
                            ...prev.footer.socialMedia,
                            twitter: e.target.value
                          }
                        }
                      }))}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">LinkedIn</label>
                    <Input
                      value={content.footer.socialMedia.linkedin || ''}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          socialMedia: {
                            ...prev.footer.socialMedia,
                            linkedin: e.target.value
                          }
                        }
                      }))}
                      placeholder="https://linkedin.com/..."
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => saveContent('footer')} 
                disabled={saving}
                className="w-full"
              >
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
