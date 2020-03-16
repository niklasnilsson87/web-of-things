<script>
  import { onMount } from 'svelte'
  import Chart from 'chart.js'

  export let chartId
  export let symbol

  let chart
  let data = []
  let lastTime = ''
  let average = ''
  $: values = []
  $: chartType = 'line'
  $: isToday = false

  onMount(async () => {
    const dataToRender = await getFeed()
    data = dataToRender
    initializeChart()
    average = getAverageValues()

    setInterval(() => {
      checkForNewValues()
    }, 30000)
  })

  function initializeChart () {
    const labels = []
    values = []

    for (let i = 0; i < data.length; i++) {
      let x = data[i]

      const time = x[0].split('T')[1].replace('Z', '')
      const date = x[0].substring(0, 10)
      const timestamp = `${date} ${time}`

      labels.push(timestamp)
      values.push(x[1])
    }

    renderChart(labels, values)
  }

  async function getFeed (startDate = '') {
		const result = await window.fetch(`https://rpi-weather-station.herokuapp.com/properties/${chartId}/chart?start_time=${startDate}`, {
			headers: { Accept: 'application/json' }
		})
		const response = await result.json()
		return response.property.values.data
	}

  function renderChart(labels, values) {
    var ctx = document.getElementById(chartId).getContext('2d')
    chart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [
          {
            label: capitalizeFirstLetter(chartId),
            backgroundColor: 'rgb(255,62,0,0.7)',
            pointBackgroundColor: 'rgb(255,255,255,0.0)',
            pointBorderColor: 'rgb(255,255,255,0.0)',
            data: values
          }
        ]
      },
      options: {
        responsiveAnimationDuration: 500,
        scales: {
          yAxes: [
            {
              ticks: {
              }
            }
          ]
        },
        legend: {
          labels: {
            fontColor: 'red'
          }
        }
      }
    })
  }

  async function checkForNewValues() {
    const last = data[data.length - 1]
    lastTime = last[0]

    const result = await window.fetch(
      `https://rpi-weather-station.herokuapp.com/properties/${chartId}/chart?start_time=${lastTime}`,
      {
        headers: { Accept: 'application/json' }
      }
    )

    const response = await result.json()

    const newData = response.property.values.data

    if (newData.length) {
      newData.forEach(data => {
        const time = data[0].split('T')[1].replace('Z', '')
        const date = data[0].substring(0, 10)
        const timestamp = `${date} ${time}`
        updateChart(timestamp, data[1])
      })
    }
  }

  function updateChart(label, data) {
    chart.data.labels.push(label)
    chart.data.datasets.forEach(dataset => {
      dataset.data.push(data)
    })

    chart.update()
    average = getAverageValues()
  }

function toggleLayout () {
  chart.destroy()
  chartType = (chartType === 'bar' ? 'line' : 'bar')
  initializeChart()
}

function capitalizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

async function getToday () {
  if (!isToday) {
    isToday = true
    const today = await getTodaysValue()
    chart.destroy()
    data = today
    initializeChart()
  } else {
    isToday = false
    const d = await getFeed()
    chart.destroy()
    data = d
    initializeChart()
  }

  average = getAverageValues()
}

async function getTodaysValue () {
    const today = new Date().toJSON().split('T')[0]
    console.log(today)
    return await getFeed(today)
}

function getAverageValues () {
  const total = values.reduce((acc, c) => acc + parseInt(c), 0)
  return (total / data.length).toFixed(2)
}


</script>
<p>{capitalizeFirstLetter(chartId)} in {symbol}</p>
<canvas id="{chartId}"></canvas>
<p>Average {chartId}: {average}</p>
<button on:click={toggleLayout}>Toggle layout</button>
<button on:click={getToday}>{isToday ? 'Get all ' : 'Get todays'} {chartId}</button>