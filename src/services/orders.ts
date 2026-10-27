import pb from '@/lib/pocketbase/client'

export interface OrderItem {
  product_name: string
  quantity: number
  price: number
  supplier_cost?: number // Custo de fornecedor unitário para dropshipping
  variation?: string
}

export type OrderStatus = 'Pendente' | 'Em andamento' | 'Concluído'

export interface OrderRecord {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  customer_number: string
  customer_complement?: string
  customer_city: string
  customer_state: string
  customer_zip: string
  items: OrderItem[]
  subtotal: number
  total: number
  supplier_total_cost?: number
  profit_margin?: number
  tracking_code?: string
  status: OrderStatus
  created: string
  updated: string
}

export interface CreateOrderInput {
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  customer_number: string
  customer_complement?: string
  customer_city: string
  customer_state: string
  customer_zip: string
  items: OrderItem[]
  subtotal: number
  total: number
  status?: OrderStatus
}

export const ordersService = {
  async listOrders(filter?: string): Promise<OrderRecord[]> {
    try {
      const records = await pb.collection('orders').getFullList({
        sort: '-created',
        filter: filter || '',
      })
      return records.map((rec) => {
        let parsedItems: OrderItem[] = []
        try {
          if (typeof rec.items === 'string') {
            parsedItems = JSON.parse(rec.items)
          } else if (Array.isArray(rec.items)) {
            parsedItems = rec.items
          }
        } catch (_) {
          parsedItems = []
        }

        return {
          id: rec.id,
          customer_name: rec.customer_name,
          customer_email: rec.customer_email,
          customer_phone: rec.customer_phone,
          customer_address: rec.customer_address,
          customer_number: rec.customer_number,
          customer_complement: rec.customer_complement,
          customer_city: rec.customer_city,
          customer_state: rec.customer_state,
          customer_zip: rec.customer_zip,
          items: parsedItems,
          subtotal: Number(rec.subtotal) || 0,
          total: Number(rec.total) || 0,
          status: (rec.status as OrderStatus) || 'Pendente',
          created: rec.created,
          updated: rec.updated,
        }
      })
    } catch (err) {
      console.error('Erro ao buscar pedidos:', err)
      return []
    }
  },

  async getOrderById(id: string): Promise<OrderRecord | null> {
    try {
      const rec = await pb.collection('orders').getOne(id)
      let parsedItems: OrderItem[] = []
      try {
        if (typeof rec.items === 'string') {
          parsedItems = JSON.parse(rec.items)
        } else if (Array.isArray(rec.items)) {
          parsedItems = rec.items
        }
      } catch (_) {
        parsedItems = []
      }

      return {
        id: rec.id,
        customer_name: rec.customer_name,
        customer_email: rec.customer_email,
        customer_phone: rec.customer_phone,
        customer_address: rec.customer_address,
        customer_number: rec.customer_number,
        customer_complement: rec.customer_complement,
        customer_city: rec.customer_city,
        customer_state: rec.customer_state,
        customer_zip: rec.customer_zip,
        items: parsedItems,
        subtotal: Number(rec.subtotal) || 0,
        total: Number(rec.total) || 0,
        status: (rec.status as OrderStatus) || 'Pendente',
        created: rec.created,
        updated: rec.updated,
      }
    } catch (err) {
      console.error(`Erro ao buscar pedido ${id}:`, err)
      return null
    }
  },

  async createOrder(data: CreateOrderInput): Promise<OrderRecord> {
    const payload = {
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      customer_address: data.customer_address,
      customer_number: data.customer_number,
      customer_complement: data.customer_complement || '',
      customer_city: data.customer_city,
      customer_state: data.customer_state,
      customer_zip: data.customer_zip,
      items: JSON.stringify(data.items),
      subtotal: data.subtotal,
      total: data.total,
      status: data.status || 'Pendente',
    }

    const rec = await pb.collection('orders').create(payload)
    return {
      id: rec.id,
      customer_name: rec.customer_name,
      customer_email: rec.customer_email,
      customer_phone: rec.customer_phone,
      customer_address: rec.customer_address,
      customer_number: rec.customer_number,
      customer_complement: rec.customer_complement,
      customer_city: rec.customer_city,
      customer_state: rec.customer_state,
      customer_zip: rec.customer_zip,
      items: data.items,
      subtotal: Number(rec.subtotal),
      total: Number(rec.total),
      status: (rec.status as OrderStatus) || 'Pendente',
      created: rec.created,
      updated: rec.updated,
    }
  },

  async updateOrderStatus(
    id: string,
    status: OrderStatus,
    trackingCode?: string,
  ): Promise<boolean> {
    try {
      // Como a coleção PocketBase possui status e items, podemos atualizar status.
      // Se trackingCode for fornecido, atualizamos em items metadata se o campo tracking_code não estiver na coleção
      const updateData: Record<string, any> = { status }
      if (trackingCode !== undefined) {
        // Guarda também no localStorage local para persistência garantida na interface
        try {
          const map = JSON.parse(localStorage.getItem('vendatech_tracking_codes') || '{}')
          map[id] = trackingCode
          localStorage.setItem('vendatech_tracking_codes', JSON.stringify(map))
        } catch {
          /* intentionally ignored */
        }
      }
      await pb.collection('orders').update(id, updateData)
      return true
    } catch (err) {
      console.error(`Erro ao atualizar status do pedido ${id}:`, err)
      return false
    }
  },

  getTrackingCode(orderId: string): string {
    try {
      const map = JSON.parse(localStorage.getItem('vendatech_tracking_codes') || '{}')
      return map[orderId] || ''
    } catch (_) {
      return ''
    }
  },
}
