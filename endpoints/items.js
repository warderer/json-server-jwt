const router = require('express').Router()
const { validateToken } = require('../middlewares/jwt_validation')
const { secret } = require('../config.js')

router.post('/', validateToken(secret), (req, res) => {
  const { role } = req.user // Obtener el rol del usuario desde el token decodificado

  if (role !== 'ADMIN') {
    return res.status(403).send({ message: 'Forbidden. Only ADMIN can create items.' })
  }

  const item = req.body
  router.db.get('items').push(item).write()
  res.send({ message: 'Item created successfully' })
})

module.exports = router
