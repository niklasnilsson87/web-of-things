const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')

const mainRoutes = require('./src/routes/router')
const setHeaders = require('./src/middlewares/setHeaders')
const model = require('./src/resources/model')

const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))
app.use(setHeaders)
app.use(model)

app.use((req, res, next) => {
  res.locals.path = req.path
  res.locals.baseURL = req.headers.host
  res.locals.protocol = req.protocol
  next()
})

// Routes
app.use('/', mainRoutes)

// Error handling
app.use((req, res, next) => {
  const error = new Error('404 Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
    .json({
      error: error.message,
      request: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
      home: `${req.protocol}://${req.headers.host}`
    })
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))
