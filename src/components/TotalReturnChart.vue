<script lang="ts">
	import {defineComponent} from '@vue/composition-api';
	import {Axis, AxisLabelsFormatterContextObject} from 'highcharts';
	import {Chart} from 'highcharts-vue';

	import mockData from '../mockData';

	const initialCapital = 1000;
	const initialShare = Math.floor(initialCapital / mockData.price[0].value);
	const remainCapital = initialCapital % mockData.price[0].value;

	export default defineComponent({
		components: {
			Chart
		},
		setup() {
			const chartData = mockData.price.map((v, i) => [
				v.timestamp,
				i === 0
					? 0
					: ((v.value * initialShare + remainCapital) / (mockData.price[0].value * initialShare + remainCapital) - 1) *
					  100
			]);

			const chartOptions = {
				title: {
					text: undefined
				},
				xAxis: {
					type: 'datetime'
				},
				yAxis: {
					title: {
						text: 'ROI'
					},
					labels: {
						formatter: (label: AxisLabelsFormatterContextObject) =>
							`${Axis.prototype.defaultLabelFormatter.call(label)} %`
					}
				},
				series: [
					{
						name: 'Total return Microsoft',
						data: chartData
					}
				]
			};

			return {chartOptions};
		}
	});
</script>

<template>
	<div class="my-5">
		<h1 class="font-bold">Total Return Chart</h1>
		<chart :options="chartOptions"></chart>
	</div>
</template>
