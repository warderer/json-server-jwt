const router = require('express').Router()
const { validateToken } = require('../middlewares/jwt_validation')
const { secret } = require('../config.js')

router.get('/', validateToken(secret), (req, res) => {
  const { id } = req.user // Obtener el ID del usuario desde el token decodificado

  const users = router.db.getState().users

  const user = users.find(u => u.id === id)

  if (!user) {
    return res.status(404).send({ message: 'User not found' })
  }

  const { password, ...userRest } = user // Remover el campo "password" de la información del usuario
  res.send(userRest) // Enviar todos los atributos del usuario, sin el campo "password"
})

module.exports = router
