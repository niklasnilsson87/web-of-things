const express = require('express')
const router = express.Router()

const model = require('../resources/model')

router.get('/', (req, res, next) => {
  if (req.headers.accept === 'application/json') {
    const obj = {
      id: model.id,
      name: model.name,
      description: model.description,
      tags: model.tags,
      resources: {
        link: model.links.properties.link,
        title: model.links.properties.title
      }
    }
    return res.status(200).json(obj)
  }

  res.render('index', { model })
})

router.get('/properties', (req, res, next) => {
  const resources = model.links.properties.resources

  if (req.headers.accept === 'application/json') {
    return res.status(200).json(resources)
  }

  res.render('properties', { properties: resources })
})

router.get('/properties/:id', (req, res, next) => {
  const id = req.params.id
  const property = model.links.properties.resources[id]

  if (!property) {
    const err = new Error('Property ID was not found')
    err.status = 404
    next(err)
  }

  if (req.headers.accept === 'application/json') {
    return res.status(200).json({ property })
  }

  res.render('property', { property })
})

module.exports = router
