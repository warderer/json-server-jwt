const { v4: uuidv4 } = require('uuid')

const addIdAndTimeStamps = (req, res, next) => {
  if (req.method === 'POST') {
    req.body.id = uuidv4()
    req.body.createdAt = Date.now()
    req.body.updatedAt = Date.now()
  }
  next()
}

module.exports = addIdAndTimeStamps
