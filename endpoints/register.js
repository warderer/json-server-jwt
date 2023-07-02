/* eslint-disable camelcase */
const bcrypt = require('bcrypt')
const { validateEmail } = require('../utils/validations')
const router = require('express').Router()

/* root: /register */
router.post('/', (req, res) => {
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

module.exports = router
