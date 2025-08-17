"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Utensils, 
  Search,
  Filter,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  category: {
    name: string;
    description: string;
  };
  isAvailable: boolean;
  isSpecial: boolean;
  calories: number;
  allergens: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
}

export default function MenuManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    calories: "",
    allergens: "",
    isAvailable: true,
    isSpecial: false
  });

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user.role !== "ADMIN") {
      router.push("/admin/login");
      return;
    }

    fetchMenuData();
  }, [session, status, router]);

  const fetchMenuData = async () => {
    try {
      const [menuRes, categoriesRes] = await Promise.all([
        fetch('/api/menu/admin'), // Admin için tüm menüleri getiren endpoint
        fetch('/api/categories')
      ]);

      const menuData = await menuRes.json();
      const categoriesData = await categoriesRes.json();

      if (menuData.success) {
        setMenuItems(menuData.data);
      }

      if (categoriesData.success) {
        setCategories(categoriesData.data);
      }
    } catch (error) {
      console.error('Menü verisi yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      calories: "",
      allergens: "",
      isAvailable: true,
      isSpecial: false
    });
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingItem ? `/api/menu/${editingItem.id}` : '/api/menu';
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert(editingItem ? 'Menü öğesi güncellendi!' : 'Menü öğesi eklendi!');
        resetForm();
        fetchMenuData();
      } else {
        alert(result.message || 'Bir hata oluştu');
      }
    } catch (error) {
      console.error('Menü işlemi hatası:', error);
      alert('Bir hata oluştu');
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || "",
      price: item.price.toString(),
      categoryId: item.categoryId,
      calories: item.calories?.toString() || "",
      allergens: item.allergens || "",
      isAvailable: item.isAvailable,
      isSpecial: item.isSpecial
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu menü öğesini silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        alert('Menü öğesi silindi!');
        fetchMenuData();
      } else {
        alert(result.message || 'Silme işlemi başarısız');
      }
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Silme işlemi sırasında bir hata oluştu');
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isAvailable: !currentStatus
        }),
      });

      const result = await response.json();

      if (result.success) {
        fetchMenuData();
      } else {
        alert('Durum güncellenirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Durum güncelleme hatası:', error);
      alert('Durum güncellenirken bir hata oluştu');
    }
  };

  // Filtreleme
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => router.push('/admin')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri Dön
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Menü Yönetimi</h1>
                <p className="text-gray-600">Menü öğelerini ve kategorileri yönetin</p>
              </div>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Menü Öğesi
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtreler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Arama</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Menü öğesi ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tüm kategoriler" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Kategoriler</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                  Filtreleri Temizle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingItem ? 'Menü Öğesini Düzenle' : 'Yeni Menü Öğesi Ekle'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ürün Adı *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Örn: Tavuk Sote"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Fiyat (₺) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="25.00"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Ürün açıklaması..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="categoryId">Kategori *</Label>
                    <Select value={formData.categoryId} onValueChange={(value) => handleSelectChange('categoryId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="calories">Kalori</Label>
                    <Input
                      id="calories"
                      name="calories"
                      type="number"
                      value={formData.calories}
                      onChange={handleInputChange}
                      placeholder="250"
                    />
                  </div>
                  <div>
                    <Label htmlFor="allergens">Alerjenler</Label>
                    <Input
                      id="allergens"
                      name="allergens"
                      value={formData.allergens}
                      onChange={handleInputChange}
                      placeholder="Gluten, Süt, Yumurta"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isAvailable"
                      name="isAvailable"
                      checked={formData.isAvailable}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <Label htmlFor="isAvailable">Mevcut</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isSpecial"
                      name="isSpecial"
                      checked={formData.isSpecial}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <Label htmlFor="isSpecial">Özel Ürün</Label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    {editingItem ? 'Güncelle' : 'Ekle'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    İptal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Menu Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {item.description || 'Açıklama yok'}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.isAvailable ? "default" : "secondary"}>
                      {item.isAvailable ? "✅ Aktif" : "❌ Pasif"}
                    </Badge>
                    {item.isSpecial && (
                      <Badge variant="destructive">⭐ Özel</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Kategori:</span>
                    <Badge variant="outline">{item.category.name}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Fiyat:</span>
                    <span className="text-lg font-bold text-green-600">₺{Number(item.price).toFixed(2)}</span>
                  </div>
                  
                  {item.calories && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Kalori:</span>
                      <span className="text-sm">{item.calories} kcal</span>
                    </div>
                  )}
                  
                  {item.allergens && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Alerjenler:</span>
                      <span className="text-xs text-red-600">{item.allergens}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Düzenle
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleAvailability(item.id, item.isAvailable)}
                    >
                      {item.isAvailable ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Menü öğesi bulunamadı
              </h3>
              <p className="text-gray-600">
                Arama kriterlerinize uygun menü öğesi yok veya henüz menü öğesi eklenmemiş.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
