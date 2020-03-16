const fetch = require('node-fetch')
require('dotenv').config()

const getProperties = async (req, res, next) => {
  const resources = req.model.links.properties.resources

  const weatherData = await getLastValuesFromPi()

  for (const item in resources) {
    resources[item].values.latest = weatherData.find(feed => feed.name === item)
  }

  if (req.headers.accept === 'application/json') {
    return res.status(200).json(resources)
  }

  res.render('properties', { properties: resources })
}

const getProperty = async (req, res, next) => {
  const id = req.params.id
  const property = req.model.links.properties.resources[id]
  const limit = req.query.limit

  if (!property) {
    const err = new Error('Property ID was not found')
    err.status = 404
    next(err)
  }

  if (req.headers.accept === 'application/json') {
    const data = await getValuesFromPi(property.id, limit)
    property.values.data = data

    return res.status(200).json({ property })
  }

  const weatherData = await getLastValuesFromPi()
  property.values.latest = weatherData.find(feed => feed.name === property.id)

  res.render('property', { property })
}

const getPropertyAsChart = async (req, res, next) => {
  const id = req.params.id
  const property = req.model.links.properties.resources[id]
  const { start_time, end_time, resolution, hours } = req.query

  if (!property) {
    const err = new Error('Property ID was not found')
    err.status = 404
    next(err)
  }

  if (req.headers.accept === 'application/json') {
    const { data } = await getChartValuesFromPi(property.id, start_time, end_time, resolution, hours)
    property.values.data = data

    return res.status(200).json({ property })
  }

  const chartData = await getChartValuesFromPi(property.id)

  property.parameters = chartData.parameters
  property.columns = chartData.columns

  res.render('property-chart', { property })
}

// Fetch feeds
async function getLastValuesFromPi () {
  const res = await fetch(`https://io.adafruit.com/api/v2/${process.env.API_USER}/feeds`, {
    headers: { 'x-aio-key': process.env.API_KEY }
  })
  const result = await res.json()

  const feeds = result.map(feed => ({
    name: feed.name,
    value: feed.last_value,
    updated: feed.updated_at
  }))

  return feeds
}

async function getValuesFromPi (feedName, limit = 30) {
  const res = await fetch(`https://io.adafruit.com/api/v2/${process.env.API_USER}/feeds/${feedName}/data?limit=${limit}`, {
    headers: { 'x-aio-key': process.env.API_KEY }
  })
  const result = await res.json()

  const data = result.map(item => ({
    value: item.value,
    timestamp: item.created_at
  }))

  return data
}

async function getChartValuesFromPi (feedName, startTime = '', endTime = '', resolution = '', hours = '') {
  const res = await fetch(`https://io.adafruit.com/api/v2/${process.env.API_USER}/feeds/${feedName}/data/chart?start_time=${startTime}&end_time=${endTime}&resolution=${resolution}&hours=${hours}`, {
    headers: { 'x-aio-key': process.env.API_KEY }
  })
  const result = await res.json()
  return result
}

module.exports = {
  getProperties,
  getProperty,
  getPropertyAsChart
}
