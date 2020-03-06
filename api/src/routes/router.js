const express = require('express')
const router = express.Router()

const model = require('../resources/model')

router.get('/', (req, res, next) => {
  req.model = model
  req.type = 'root'

  res.render('index', { model })
})

module.exports = router
