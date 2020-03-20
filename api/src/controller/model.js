module.exports = (req, res, next) => {
  const model = req.model

  if (req.headers.accept === 'application/json') {
    return res.status(200).json(model)
  }

  res.render('model', { model })
}
