const router = require('express').Router()
const { validateToken } = require('../middlewares/jwt_validation')
const { secret } = require('../config.js')

router.get('/:id', validateToken(secret), (req, res) => {
  const { role } = req.user // Obtener el rol del usuario desde el token decodificado

  if (role !== 'ADMIN') {
    return res.status(403).send({ message: 'Forbidden. Only ADMIN can view user data.' })
  }

  const users = router.db.getState().users
  const user = users.find(u => u.id === req.params.id)

  if (!user) return res.status(404).send('User not found')

  const { password, ...userRest } = user // Remuevo el password de la información del usuario que devolverá la API

  res.send(userRest) // Envío todos los atributos del usuario, sin el password
})

router.get('/', validateToken(secret), (req, res) => {
  const { role } = req.user // Obtener el rol del usuario desde el token decodificado

  if (role !== 'ADMIN') {
    return res.status(403).send({ message: 'Forbidden. Only ADMIN can list users.' })
  }

  const users = router.db.getState().users
  // Elimino el campo password de la lista de usuarios que devolverá la API
  const usersWithoutPassword = users.map(user => {
    const { password, ...userRest } = user
    return userRest
  })

  res.send(usersWithoutPassword) // Envío todos los atributos del usuario, sin el password
})

module.exports = router
