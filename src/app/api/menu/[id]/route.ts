import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            name: true,
            description: true
          }
        }
      }
    })

    if (!menuItem) {
      return NextResponse.json(
        { success: false, message: 'Menü öğesi bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: menuItem
    })

  } catch (error) {
    console.error('Menü öğesi getirme hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Menü öğesi getirilirken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    const updatedMenuItem = await prisma.menuItem.update({
      where: { id },
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        categoryId,
        calories: calories ? parseInt(calories) : null,
        allergens: allergens || null,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        isSpecial: isSpecial !== undefined ? isSpecial : false,
        updatedAt: new Date()
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
      message: 'Menü öğesi başarıyla güncellendi',
      data: updatedMenuItem
    })

  } catch (error) {
    console.error('Menü öğesi güncelleme hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Menü öğesi güncellenirken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updatedMenuItem = await prisma.menuItem.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date()
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
      message: 'Menü öğesi başarıyla güncellendi',
      data: updatedMenuItem
    })

  } catch (error) {
    console.error('Menü öğesi güncelleme hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Menü öğesi güncellenirken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Önce bu menü öğesinin siparişlerde kullanılıp kullanılmadığını kontrol et
    const orderItems = await prisma.orderItem.findMany({
      where: { menuItemId: id }
    })

    if (orderItems.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Bu menü öğesi siparişlerde kullanıldığı için silinemez' 
        },
        { status: 400 }
      )
    }

    await prisma.menuItem.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Menü öğesi başarıyla silindi'
    })

  } catch (error) {
    console.error('Menü öğesi silme hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Menü öğesi silinirken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}
