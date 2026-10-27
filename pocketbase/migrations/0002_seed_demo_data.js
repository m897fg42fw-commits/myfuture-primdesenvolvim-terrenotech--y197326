migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    // 1. Seed admin user
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'me.candre14@gmail.com')
    } catch (_) {
      const record = new Record(users)
      record.setEmail('me.candre14@gmail.com')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Admin Vendatech')
      app.save(record)
    }

    // 2. Seed 3 demo orders
    const orders = app.findCollectionByNameOrId('orders')

    try {
      const existing = app.findRecordsByFilter('orders', "customer_email != ''", '-created', 1, 0)
      if (existing.length > 0) {
        return // already seeded
      }
    } catch (_) {}

    const demoOrders = [
      {
        customer_name: 'Carlos Silva',
        customer_email: 'carlos.silva@exemplo.com',
        customer_phone: '(11) 98765-4321',
        customer_address: 'Avenida Paulista',
        customer_number: '1578',
        customer_complement: 'Apto 82',
        customer_city: 'São Paulo',
        customer_state: 'SP',
        customer_zip: '01310-200',
        items: [
          {
            product_name: 'Fone Bluetooth ANC Pro',
            quantity: 1,
            price: 149.9,
            variation: 'Preto',
          },
        ],
        subtotal: 149.9,
        total: 149.9,
        status: 'Concluído',
      },
      {
        customer_name: 'Ana Souza',
        customer_email: 'ana.souza@exemplo.com',
        customer_phone: '(21) 99123-4567',
        customer_address: 'Rua das Laranjeiras',
        customer_number: '400',
        customer_complement: 'Bloco B, 403',
        customer_city: 'Rio de Janeiro',
        customer_state: 'RJ',
        customer_zip: '22240-006',
        items: [
          {
            product_name: 'Teclado Mecânico RGB Hot-Swap',
            quantity: 1,
            price: 299.0,
            variation: 'Switch Red',
          },
        ],
        subtotal: 299.0,
        total: 299.0,
        status: 'Em andamento',
      },
      {
        customer_name: 'Pedro Santos',
        customer_email: 'pedro.santos@exemplo.com',
        customer_phone: '(31) 98877-6655',
        customer_address: 'Rua Pernambuco',
        customer_number: '1020',
        customer_complement: 'Sala 5',
        customer_city: 'Belo Horizonte',
        customer_state: 'MG',
        customer_zip: '30130-151',
        items: [
          {
            product_name: 'Câmera de Segurança Wi-Fi 360',
            quantity: 1,
            price: 399.9,
            variation: 'Branco',
          },
        ],
        subtotal: 399.9,
        total: 399.9,
        status: 'Pendente',
      },
    ]

    for (const ord of demoOrders) {
      const record = new Record(orders)
      record.set('customer_name', ord.customer_name)
      record.set('customer_email', ord.customer_email)
      record.set('customer_phone', ord.customer_phone)
      record.set('customer_address', ord.customer_address)
      record.set('customer_number', ord.customer_number)
      record.set('customer_complement', ord.customer_complement)
      record.set('customer_city', ord.customer_city)
      record.set('customer_state', ord.customer_state)
      record.set('customer_zip', ord.customer_zip)
      record.set('items', JSON.stringify(ord.items))
      record.set('subtotal', ord.subtotal)
      record.set('total', ord.total)
      record.set('status', ord.status)
      app.save(record)
    }
  },
  (app) => {
    // rollback if needed
  },
)
