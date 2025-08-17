import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Bildirim mesajlarını tutan kuyruk
let messageQueue: Array<{
  id: string;
  type: 'NEW_ORDER' | 'ORDER_STATUS_UPDATE' | 'PAGE_VISIT';
  message: string;
  data?: any;
  timestamp: string;
}> = [];

// Bağlı client'ları tutan set
let clients = new Set<ReadableStreamDefaultController>();

// Duplicate bildirimleri engellemek için son bildirimleri tut
let lastNotifications = new Map<string, { timestamp: number; data: any }>();

// Duplicate kontrol fonksiyonu
function isDuplicateNotification(type: string, data: any): boolean {
  const key = `${type}_${JSON.stringify(data)}`;
  const now = Date.now();
  const last = lastNotifications.get(key);
  
  if (last && (now - last.timestamp) < 5000) { // 5 saniye içinde aynı bildirim
    return true;
  }
  
  lastNotifications.set(key, { timestamp: now, data });
  return false;
}

// Tüm client'lara mesaj gönder
function broadcastMessage(message: any) {
  const sseMessage = `data: ${JSON.stringify(message)}\n\n`;
  
  clients.forEach(client => {
    try {
      client.enqueue(new TextEncoder().encode(sseMessage));
    } catch (error) {
      console.error('❌ DEBUG: Client notification hatası:', error);
    }
  });
}

// Bildirim log'unu veritabanına kaydet
async function saveNotificationLog(type: string, message: string, data?: any, userId?: string) {
  try {
    await prisma.notificationLog.create({
      data: {
        type,
        message,
        data: data || {},
        userId
      }
    });
  } catch (error) {
    console.error('❌ Bildirim log kaydedilemedi:', error);
  }
}

// Yeni sipariş bildirimi
export function notifyNewOrder(order: any) {
  // Duplicate kontrol
  if (isDuplicateNotification('NEW_ORDER', { orderNumber: order?.orderNumber })) {
    console.log('🔄 Duplicate NEW_ORDER bildirimi engellendi:', order?.orderNumber);
    return;
  }

  const now = new Date();
  const timeString = now.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  // Hata handling - undefined değerler için fallback
  const orderNumber = order?.orderNumber || 'N/A';
  const customerName = order?.customerName || 'Misafir Kullanıcı';
  const totalAmount = order?.totalAmount || 0;

  const message = {
    id: Date.now().toString(),
    type: 'NEW_ORDER' as const,
    message: `🔔 YENİ SİPARİŞ! #${orderNumber} - ${customerName} - ₺${totalAmount} - ${timeString}`,
    data: {
      orderNumber,
      customerName,
      totalAmount
    },
    timestamp: timeString
  };
  
  messageQueue.push(message);
  broadcastMessage(message);
  
  // Bildirim log'unu kaydet
  saveNotificationLog('NEW_ORDER', message.message, message.data);
}

// Sipariş durumu güncelleme bildirimi
export function notifyOrderStatusUpdate(order: any) {
  const now = new Date();
  const timeString = now.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const message = {
    id: Date.now().toString(),
    type: 'ORDER_STATUS_UPDATE' as const,
    message: `✅ Sipariş durumu güncellendi: #${order.orderNumber}`,
    data: order,
    timestamp: timeString
  };
  
  messageQueue.push(message);
  broadcastMessage(message);
}

// Sayfa ziyaret bildirimi
export function notifyPageVisit(visitorData: any) {
  const now = new Date();
  const timeString = now.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const message = {
    id: Date.now().toString(),
    type: 'PAGE_VISIT' as const,
    message: visitorData.message || '👤 Yeni müşteri sipariş sayfasında',
    data: visitorData,
    timestamp: visitorData.timestamp || timeString
  };
  
  messageQueue.push(message);
  broadcastMessage(message);
}

// SSE bağlantısı kur
export async function GET(request: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      // Client'ı listeye ekle
      clients.add(controller)

      // Welcome mesajı gönder
      const now = new Date();
      const timeString = now.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const welcomeMessage = {
        id: Date.now().toString(),
        type: 'PING' as const,
        message: 'SSE bağlantısı kuruldu',
        timestamp: timeString
      };
      
      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(welcomeMessage)}\n\n`));

      // Keep-alive ping gönder (30 saniyede bir)
      const pingInterval = setInterval(() => {
        try {
          const now = new Date();
          const timeString = now.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });

          const pingMessage = {
            id: Date.now().toString(),
            type: 'PING' as const,
            message: 'Bağlantı aktif',
            timestamp: timeString
          };

          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(pingMessage)}\n\n`));
        } catch (error) {
          console.error('Ping gönderme hatası:', error);
          clearInterval(pingInterval);
        }
      }, 30000);

      // Client bağlantısı koptuğunda temizlik yap
      request.signal.addEventListener('abort', () => {
        clearInterval(pingInterval)
        clients.delete(controller)
        controller.close()
      })
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    }
  })
}

// Test endpoint'i - yeni sipariş simülasyonu
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, message, data, timestamp } = body

    if (!type || !message) {
      return NextResponse.json(
        { success: false, message: 'Tip ve mesaj gerekli' },
        { status: 400 }
      )
    }

    switch (type) {
      case 'PAGE_VISIT':
        notifyPageVisit({ message, timestamp });
        break;
      case 'NEW_ORDER':
        notifyNewOrder(data);
        break;
      case 'ORDER_STATUS_UPDATE':
        notifyOrderStatusUpdate(data);
        break;
      default:
        return NextResponse.json(
          { success: false, message: 'Geçersiz bildirim tipi' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      message: 'Bildirim gönderildi'
    })

  } catch (error) {
    console.error('Bildirim gönderme hatası:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Bildirim gönderilirken bir hata oluştu'
      },
      { status: 500 }
    )
  }
}
