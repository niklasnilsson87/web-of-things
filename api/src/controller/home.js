const model = require('../resources/model')

module.exports = (req, res, next) => {
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
}
