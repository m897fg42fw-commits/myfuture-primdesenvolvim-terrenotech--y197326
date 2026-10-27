migrate(
  (app) => {
    const collection = new Collection({
      name: 'orders',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'customer_name', type: 'text', required: true },
        { name: 'customer_email', type: 'text', required: true },
        { name: 'customer_phone', type: 'text', required: true },
        { name: 'customer_address', type: 'text', required: true },
        { name: 'customer_number', type: 'text', required: true },
        { name: 'customer_complement', type: 'text' },
        { name: 'customer_city', type: 'text', required: true },
        { name: 'customer_state', type: 'text', required: true },
        { name: 'customer_zip', type: 'text', required: true },
        { name: 'items', type: 'json', required: true },
        { name: 'subtotal', type: 'number', required: true },
        { name: 'total', type: 'number', required: true },
        {
          name: 'status',
          type: 'select',
          required: true,
          values: ['Pendente', 'Em andamento', 'Concluído'],
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_orders_status ON orders (status)',
        'CREATE INDEX idx_orders_created ON orders (created DESC)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId('orders')
      app.delete(collection)
    } catch (_) {}
  },
)
