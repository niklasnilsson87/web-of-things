const express = require('express')
const router = express.Router()

const home = require('../controller/home')
const properties = require('../controller/properties')
const model = require('../controller/model')

router.get('/', home)
router.get('/model', model)
router.get('/properties', properties.getProperties)
router.get('/properties/:id', properties.getProperty)
router.get('/properties/:id/chart', properties.getPropertyAsChart)

module.exports = router
