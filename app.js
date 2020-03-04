const sensorLib = require('node-dht-sensor')

sensorLib.initialize(22, 12)

const interval = setInterval(() => {
    read()
}, 2000);

function read () {
    const readOut = sensorLib.read()
    console.log(`Temperature: ${readOut.temperature.toFixed(2)}C, \nHumidity: ${readOut.humidity.toFixed(2)}% `)
}

process.on('SIGINT', function () {
    clearInterval(interval)
    console.log('Bye, bye!')
    process.exit()
  });