/* eslint-disable camelcase */
const jsonServer = require('json-server')
const path = require('path')
const server = jsonServer.create()
const source = path.join(__dirname, 'db.json')
const router = jsonServer.router(source)
// const router = jsonServer.router('db.json');
const jwt = require('jsonwebtoken')
const secret = 'your-secret-key'
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const { validateEmail } = require('./utils/validations')
const { validateToken } = require('./middlewares/jwt_validation')

const PORT = process.env.PORT || 3000

server.use(jsonServer.defaults())
server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.id = uuidv4()
    req.body.createdAt = Date.now()
    req.body.updatedAt = Date.now()
  }
  next()
})

server.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.sendStatus(400)
    return
  }

  const users = router.db.getState().users
  const user = users.find((user) => user.email === email)
  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ id: user.id, role: user.role }, secret)
        res.send({ token })
      } else {
        res.status(401).send(err)
      }
    })
  } else {
    res.sendStatus(404)
  }
})

server.post('/register', (req, res) => {
  // const users = db.get('users').value();
  const {
    id,
    first_name,
    last_name,
    birth_date,
    gender,
    email,
    password,
    role,
    createdAt,
    updatedAt
  } = req.body

  if (!email || !password || (gender !== 'M' && gender !== 'F')) {
    res.sendStatus(400)
    return
  }

  if (!validateEmail(email)) {
    res.status(400).send({ message: 'Invalid email format' })
    return
  }

  const users = router.db.getState().users

  const user = users.find((user) => user.email === email)
  if (!user) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) { console.log(err.stack) }
      const user = {
        id,
        first_name,
        last_name,
        gender,
        birth_date,
        email,
        password: hashedPassword,
        role: role || 'CUSTOMER',
        createdAt,
        updatedAt
      }
      router.db.get('users').push(user).write()
      res.status(201).send({ message: 'User created successfully' })
    })
  } else {
    res.status(403).send({ message: 'Duplicated email' })
  }
})

server.post('/items', validateToken(secret), (req, res) => {
  const item = req.body
  router.db.get('items').push(item).write()
  res.send({ message: 'Item created successfully' })
})

// Elimino el campo password de la respuesta de obtener un usuario
server.get('/users/:id', (req, res) => {
  const users = router.db.getState().users
  const user = users.find(u => u.id === req.params.id)
  if (!user) return res.status(404).send('User not found')
  const { password, ...userRest } = user // Remuevo el password de la información del usuario
  res.send(userRest) // Envio todos los atributos del usuario, sin el password
})

// Elimino el campo password de la lista de usuarios
server.get('/users', (req, res) => {
  const users = router.db.getState().users
  const userRest = users.map(user => {
    delete user.password // Elimino el atributo de password
    return user
  })
  res.send(userRest) // Envio todos los atributos del usuario, sin el password
})

server.use(router)
// server.use('/api/v1', router)

server.listen(PORT, () => {
  console.log('JSON Server is running on http://localhost:' + PORT)
})
