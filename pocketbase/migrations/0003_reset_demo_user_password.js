migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'me.candre14@gmail.com')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      app.save(record)
    } catch (_) {
      const record = new Record(users)
      record.setEmail('me.candre14@gmail.com')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Admin Vendatech')
      app.save(record)
    }
  },
  (app) => {},
)
