/* eslint-disable camelcase */
const jsonServer = require('json-server')
const path = require('path')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))

const addIdAndTimeStamps = require('./middlewares/addIdAndTimeStamps')

const loginEndpoint = require('./endpoints/login')
const registerEndpoint = require('./endpoints/register')
const itemsEndpoint = require('./endpoints/items')
const usersEndpoint = require('./endpoints/users')
const meEndpoint = require('./endpoints/me')

const PORT = process.env.PORT || 3000

server.use(jsonServer.defaults())
server.use(jsonServer.bodyParser)

// Middleware para añadir id y timestamps a los objetos que se crean
server.use(addIdAndTimeStamps)

// Middleware para redireccionar '/users/me' a '/me', ya que json-server no soporta rutas anidadas
server.use((req, res, next) => {
  if (req.url === '/users/me') {
    req.url = '/me'
  }
  next()
})

// Pasa la instancia de router.db a los endpoints
usersEndpoint.db = router.db
itemsEndpoint.db = router.db
loginEndpoint.db = router.db
registerEndpoint.db = router.db
meEndpoint.db = router.db

// Ruta '/login' manejada por el endpoint login.js
server.use('/login', loginEndpoint)

// Ruta '/register' manejada por el endpoint register.js
server.use('/register', registerEndpoint)

// Ruta '/items' manejada por el endpoint items.js
server.use('/items', itemsEndpoint)

// Rutas '/users/:id' y '/users' manejadas por el endpoint users.js
server.use('/users', usersEndpoint)

// Ruta '/me' manejada por el endpoint me.js
server.use('/me', meEndpoint)

server.use(router)

// Levantamos el servidor
server.listen(PORT, () => {
  console.log('JSON Server is running on http://localhost:' + PORT)
})
