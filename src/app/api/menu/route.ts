import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: {
        isAvailable: true  // Sadece aktif menüler
      },
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

    // Kategorilere göre grupla
    const groupedMenu = menuItems.reduce((acc, item) => {
      const categoryName = item.category.name
      if (!acc[categoryName]) {
        acc[categoryName] = {
          category: item.category,
          items: []
        }
      }
      acc[categoryName].items.push(item)
      return acc
    }, {} as Record<string, any>)

    return NextResponse.json({
      success: true,
      data: {
        grouped: groupedMenu,
        all: menuItems
      }
    })

  } catch (error) {
    console.error('Menü getirme hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Menü getirilirken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      description, 
      price, 
      categoryId, 
      calories, 
      allergens, 
      isAvailable, 
      isSpecial 
    } = body

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { success: false, message: 'Gerekli alanlar eksik' },
        { status: 400 }
      )
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        categoryId,
        calories: calories ? parseInt(calories) : null,
        allergens: allergens || null,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        isSpecial: isSpecial !== undefined ? isSpecial : false
      },
      include: {
        category: {
          select: {
            name: true,
            description: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Menü öğesi başarıyla oluşturuldu',
      data: menuItem
    })

  } catch (error) {
    console.error('Menü öğesi oluşturma hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Menü öğesi oluşturulurken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}
