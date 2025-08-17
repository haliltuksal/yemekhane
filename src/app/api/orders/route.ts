import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notifyNewOrder } from '../notifications/route'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, address, city, selectedMenu, totalAmount, paymentMethod } = body

    // Gerekli alanları kontrol et
    if (!name || !phone || !address || !city || !selectedMenu || !totalAmount) {
      return NextResponse.json(
        { success: false, message: 'Gerekli alanlar eksik' },
        { status: 400 }
      )
    }

    // Kullanıcıyı bul veya oluştur
    let user = await prisma.user.findFirst({
      where: { phone }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          phone,
          address,
          city,
          role: 'CUSTOMER'
        }
      })
    }

    // Sipariş numarası oluştur (YYYYMMDD-XXXX formatında)
    const today = new Date()
    const dateString = today.getFullYear().toString() +
                      (today.getMonth() + 1).toString().padStart(2, '0') +
                      today.getDate().toString().padStart(2, '0')
    
    const orderCount = await prisma.order.count({
      where: {
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth(), today.getDate())
        }
      }
    })
    
    const orderNumber = `${dateString}-${(orderCount + 1).toString().padStart(4, '0')}`

    // Siparişi oluştur
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        totalAmount: parseFloat(totalAmount),
        status: 'PENDING',
        paymentMethod: (paymentMethod || 'CASH').toUpperCase(),
        paymentStatus: 'PENDING',
        deliveryAddress: address,
        deliveryCity: city,
        notes: ''
      }
    })

    // Sipariş detaylarını oluştur
    if (selectedMenu) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          menuItemId: selectedMenu,
          quantity: 1,
          price: parseFloat(totalAmount),
          notes: null
        }
      })
    }

    // Admin'e bildirim gönder
    notifyNewOrder({
      orderNumber: order.orderNumber,
      customerName: name, // Form'dan gelen ismi kullan
      totalAmount: order.totalAmount
    });

    return NextResponse.json({
      success: true,
      message: 'Sipariş başarıyla oluşturuldu',
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber
      }
    })

  } catch (error) {
    console.error('Sipariş oluşturma hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Sipariş oluşturulurken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: orders
    })

  } catch (error) {
    console.error('Sipariş listesi hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Siparişler listelenirken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}
