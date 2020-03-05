const mqtt = require('mqtt')
require('dotenv').config()
const sensor = require('node-dht-sensor')

const client = mqtt.connect('mqtts://io.adafruit.com', {
  port: 8883,
  username: process.env.ADAFRUIT_USERNAME,
  password: process.env.ADAFRUIT_API_KEY
})

client.on('connect', () => {
  console.log('Connected to io.adafruit.com')

  client.subscribe('adamniklas/feeds/temperature')
  client.subscribe('adamniklas/feeds/humidity')
  getWeather(client)
})

client.on('close', () => {
  console.log('Connection to io.adafruit.com closed')
})

function getWeather (client) {
  const interval = setInterval(() => {
    read()
  }, 6000)

  const read = () => {
    sensor.read(22, 12, (err, temperature, humidity) => {
      if (err) {
        console.log(err)
      }

      console.log('Sending temperature', temperature.toFixed(2))
      console.log('Sending humidity', humidity.toFixed(2))

      client.publish('adamniklas/feeds/temperature', temperature.toFixed(2))
      client.publish('adamniklas/feeds/humidity', humidity.toFixed(2))
    })
  }

  process.on('SIGINT', function () {
    clearInterval(interval)
    console.log('Bye, bye!')
    process.exit()
  })
}
