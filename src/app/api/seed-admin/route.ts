import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Admin kullanıcısını kontrol et veya oluştur
    let adminUser = await prisma.user.findFirst({
      where: { 
        email: 'admin@yemekhane.com',
        role: 'ADMIN'
      }
    })

    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: {
          email: 'admin@yemekhane.com',
          name: 'Admin User',
          phone: '05550000000',
          address: 'Admin Address',
          city: 'İstanbul',
          role: 'ADMIN'
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Admin kullanıcısı başarıyla oluşturuldu!',
      data: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      }
    })

  } catch (error) {
    console.error('Admin kullanıcısı oluşturma hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Admin kullanıcısı oluşturulurken bir hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    )
  }
}
