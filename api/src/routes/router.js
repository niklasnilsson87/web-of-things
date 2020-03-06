const express = require('express')
const router = express.Router()

const home = require('../controller/home')
const properties = require('../controller/properties')

router.get('/', home)
router.get('/properties', properties.getProperties)
router.get('/properties/:id', properties.getProperty)

module.exports = router
