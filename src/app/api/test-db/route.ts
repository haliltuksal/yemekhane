import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Veritabanı bağlantısını test et
    await prisma.$connect()
    
    // Tablo sayısını kontrol et
    const userCount = await prisma.user.count()
    const categoryCount = await prisma.category.count()
    const menuItemCount = await prisma.menuItem.count()
    const orderCount = await prisma.order.count()
    
    return NextResponse.json({
      success: true,
      message: 'Veritabanı bağlantısı başarılı!',
      tables: {
        users: userCount,
        categories: categoryCount,
        menuItems: menuItemCount,
        orders: orderCount
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Veritabanı bağlantı hatası',
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
