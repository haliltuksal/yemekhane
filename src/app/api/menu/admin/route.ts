import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        category: {
          select: {
            name: true,
            description: true
          }
        }
      },
      orderBy: [
        { category: { sortOrder: 'asc' } },
        { name: 'asc' }
      ]
    })

    return NextResponse.json({
      success: true,
      data: menuItems
    })

  } catch (error) {
    console.error('Admin menü getirme hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Admin menü getirilirken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}
