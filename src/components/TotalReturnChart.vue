<script lang="ts">
	import {defineComponent} from '@vue/composition-api';
	import {Axis, AxisLabelsFormatterContextObject} from 'highcharts';
	import {Chart} from 'highcharts-vue';

	import {DividendData, StockPriceData} from '@/types';

	const initialCapital = 1000;

	export default defineComponent({
		props: {
			companyName: {
				type: String as () => string,
				required: true
			},
			mockData: {
				type: Object as () => {
					price: StockPriceData[];
					dividend: DividendData[];
				},
				required: true
			}
		},
		components: {
			Chart
		},
		setup(props) {
			const mockData = props.mockData;
			const calculateGain = (currentPrice: number, numberOfShare: number, remainCapital: number) =>
				((currentPrice * numberOfShare + remainCapital) / initialCapital - 1) * 100;

			const capitalGainChartData = () => {
				const numberOfShare = Math.floor(initialCapital / mockData.price[0].value);
				const remainCapital = initialCapital % mockData.price[0].value;

				return mockData.price.map((v, i) => [
					v.timestamp,
					i === 0 ? 0 : calculateGain(v.value, numberOfShare, remainCapital)
				]);
			};

			const totalReturnChartData = () => {
				let numberOfShare = Math.floor(initialCapital / mockData.price[0].value);
				let remainCapital = initialCapital % mockData.price[0].value;
				let chartData: number[][] = [];
				let exDivDate = 0;

				mockData.price.forEach((priceData, i) => {
					mockData.dividend.some((dividendData) => {
						const isReinvestingDividend =
							priceData.timestamp >= dividendData.timestamp &&
							Math.min(priceData.timestamp, dividendData.timestamp) > exDivDate;

						if (isReinvestingDividend) {
							const returnOnDividend = numberOfShare * dividendData.value;
							numberOfShare = numberOfShare + Math.floor((returnOnDividend + remainCapital) / priceData.value);
							remainCapital = (returnOnDividend + remainCapital) % priceData.value;
							exDivDate = dividendData.timestamp;
							return true;
						}
					});
					chartData.push([
						priceData.timestamp,
						i === 0 ? 0 : calculateGain(priceData.value, numberOfShare, remainCapital)
					]);
				});

				return chartData;
			};

			const chartOptions = {
				title: {
					text: undefined
				},
				xAxis: {
					type: 'datetime'
				},
				yAxis: {
					labels: {
						formatter: (label: AxisLabelsFormatterContextObject) =>
							`${Axis.prototype.defaultLabelFormatter.call(label)} %`
					}
				},
				series: [
					{
						name: `Capital Gain ${props.companyName}`,
						data: capitalGainChartData()
					},
					{
						name: `Total Return ${props.companyName}`,
						data: totalReturnChartData()
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
