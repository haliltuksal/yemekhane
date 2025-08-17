import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notifyOrderStatusUpdate } from '../../notifications/route'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Durum bilgisi gerekli' },
        { status: 400 }
      )
    }

    // Geçerli durumları kontrol et
    const validStatuses = [
      'PENDING', 'CONFIRMED', 'PREPARING', 'READY', 
      'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'
    ]

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Geçersiz durum' },
        { status: 400 }
      )
    }

    // Siparişi güncelle
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { 
        status,
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            name: true,
            phone: true,
            email: true
          }
        },
        orderItems: {
          include: {
            menuItem: {
              select: {
                name: true,
                price: true
              }
            }
          }
        }
      }
    })

    // Real-time bildirim gönder
    try {
      notifyOrderStatusUpdate(id, status, updatedOrder)
    } catch (notificationError) {
      console.error('Bildirim gönderme hatası:', notificationError)
      // Bildirim hatası sipariş güncellemeyi etkilemesin
    }

    return NextResponse.json({
      success: true,
      message: 'Sipariş durumu başarıyla güncellendi',
      data: updatedOrder
    })

  } catch (error) {
    console.error('Sipariş durumu güncelleme hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Sipariş durumu güncellenirken bir hata oluştu',
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            phone: true,
            email: true
          }
        },
        orderItems: {
          include: {
            menuItem: {
              select: {
                name: true,
                price: true
              }
            }
          }
        }
      }
    })

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Sipariş bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: order
    })

  } catch (error) {
    console.error('Sipariş detayı hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Sipariş detayı alınırken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}
