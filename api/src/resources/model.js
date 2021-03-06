module.exports = (req, res, next) => {
  const baseURL = `${req.protocol}://${req.headers.host}`

  const model = {
    id: baseURL,
    name: 'Weather Station Raspberry Pi',
    description: 'A simple weather station measuring temperature and humidity.',
    tags: [
      'raspberry',
      'pi',
      'WoT',
      'weather'
    ],
    links: {
      product: {
        link: 'https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/',
        title: 'Product the weather station is based on'
      },
      properties: {
        link: baseURL + '/properties',
        title: 'List of Properties',
        resources: {
          temperature: {
            link: baseURL + '/properties/temperature',
            name: 'Temperature Sensor',
            description: 'An ambient temperature sensor.',
            id: 'temperature',
            values: {
              name: 'Temperature sensor',
              description: 'The temperature in celsius',
              unit: 'celsius',
              customFields: {
                gpio: 12
              }
            },
            tags: [
              'sensor',
              'public',
              'indoors'
            ]
          },
          humidity: {
            link: baseURL + '/properties/humidity',
            name: 'Humidity Sensor',
            description: 'An ambient humidity sensor.',
            id: 'humidity',
            values: {
              name: 'Humidity',
              description: 'Percentage of Humidity',
              unit: '%',
              customFields: {
                gpio: 12
              }
            },
            tags: [
              'sensor',
              'public'
            ]
          }
        },
        type: {
          link: 'http://w3.org/Submission/wot-model',
          title: 'Context resource of the Pi'
        },
        help: {
          link: baseURL,
          title: 'Documentation'
        },
        ui: {
          link: baseURL,
          title: 'User Interface'
        }
      }
    }
  }

  req.model = model
  next()
}
