<script>
  import { onMount } from "svelte";
  import Chart from './Chart.svelte'
</script>

<main>
	<h1>Weather dashboard</h1>
	<div class="flex">
		<div class='chart'>
			<Chart chartId='temperature' symbol='°' />
		</div>
		<div class='chart'>
			<Chart chartId='humidity' symbol='%' />
		</div>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		font-size: 3em;
		font-weight: 100;
	}

	.flex {
		display: flex;
	}

	.chart {
		width: 50%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	@media (max-width: 600px) {
		.chart {
			width: 100%;
		}

		.flex {
			flex-direction: column;
		}
	}
</style>