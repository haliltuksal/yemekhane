import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Örnek kategoriler ekle
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Ana Yemekler',
          description: 'Geleneksel Türk mutfağından ana yemekler',
          sortOrder: 1
        }
      }),
      prisma.category.create({
        data: {
          name: 'Çorbalar',
          description: 'Sıcak ve soğuk çorbalar',
          sortOrder: 2
        }
      }),
      prisma.category.create({
        data: {
          name: 'Salatalar',
          description: 'Taze ve sağlıklı salatalar',
          sortOrder: 3
        }
      }),
      prisma.category.create({
        data: {
          name: 'Tatlılar',
          description: 'Geleneksel ve modern tatlılar',
          sortOrder: 4
        }
      }),
      prisma.category.create({
        data: {
          name: 'İçecekler',
          description: 'Sıcak ve soğuk içecekler',
          sortOrder: 5
        }
      })
    ])

    // Örnek menü öğeleri ekle
    const menuItems = await Promise.all([
      prisma.menuItem.create({
        data: {
          name: 'Mercimek Çorbası',
          description: 'Geleneksel Türk mercimek çorbası',
          price: 25.00,
          categoryId: categories[1].id,
          calories: 180,
          isAvailable: true
        }
      }),
      prisma.menuItem.create({
        data: {
          name: 'Tavuk Sote',
          description: 'Özel soslu tavuk sote',
          price: 45.00,
          categoryId: categories[0].id,
          calories: 320,
          isAvailable: true
        }
      }),
      prisma.menuItem.create({
        data: {
          name: 'Cesar Salata',
          description: 'Taze marul, parmesan peyniri ve özel sos',
          price: 35.00,
          categoryId: categories[2].id,
          calories: 220,
          isAvailable: true
        }
      }),
      prisma.menuItem.create({
        data: {
          name: 'Künefe',
          description: 'Geleneksel Türk tatlısı',
          price: 30.00,
          categoryId: categories[3].id,
          calories: 280,
          isAvailable: true
        }
      }),
      prisma.menuItem.create({
        data: {
          name: 'Türk Kahvesi',
          description: 'Geleneksel Türk kahvesi',
          price: 15.00,
          categoryId: categories[4].id,
          calories: 5,
          isAvailable: true
        }
      })
    ])

    // Örnek sertifika ekle
    const certificate = await prisma.certificate.create({
      data: {
        name: 'HACCP Sertifikası',
        description: 'Gıda güvenliği ve hijyen sertifikası',
        image: '/certificates/haccp.png',
        issueDate: new Date('2024-01-01'),
        isActive: true,
        sortOrder: 1
      }
    })

    // Örnek içerik ekle
    const content = await prisma.content.create({
      data: {
        page: 'hakkimizda',
        title: 'Hakkımızda',
        content: 'Yemekhane olarak 20 yılı aşkın deneyimimizle...',
        metaTitle: 'Yemekhane Hakkında',
        metaDescription: 'Yemekhane şirketi hakkında detaylı bilgi',
        isActive: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Örnek veriler başarıyla eklendi!',
      data: {
        categories: categories.length,
        menuItems: menuItems.length,
        certificates: 1,
        contents: 1
      }
    })

  } catch (error) {
    console.error('Veri ekleme hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Veri ekleme hatası',
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    )
  }
}
