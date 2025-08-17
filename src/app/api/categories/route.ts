import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true
      },
      orderBy: [
        { sortOrder: 'asc' },
        { name: 'asc' }
      ]
    })

    return NextResponse.json({
      success: true,
      data: categories
    })

  } catch (error) {
    console.error('Kategoriler getirme hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Kategoriler getirilirken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, sortOrder } = body

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Kategori adı gerekli' },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name,
        description: description || null,
        sortOrder: sortOrder || 0,
        isActive: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Kategori başarıyla oluşturuldu',
      data: category
    })

  } catch (error) {
    console.error('Kategori oluşturma hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Kategori oluşturulurken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}
