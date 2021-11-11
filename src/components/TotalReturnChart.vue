<script lang="ts">
	import {computed, defineComponent, ref} from '@vue/composition-api';
	import {ApexOptions} from 'apexcharts';
	import VueSelect from 'vue-select';

	import calculateChartData from './calculateChartData';
	import {MockData} from '@/types';

	const initialCapital = 1000;
	const compareOptions = ['APPL', 'XOM'];

	export default defineComponent({
		props: {
			companyName: {
				type: String as () => string,
				required: true
			},
			mockData: {
				type: Object as () => Record<string, MockData>,
				required: true
			}
		},
		components: {
			VueSelect
		},
		setup(props) {
			const comparedChartData = ref();

			const {totalReturnChartData, capitalGainChartData} = calculateChartData(initialCapital, props.mockData.msft);

			const handleCompare = (value: string): void => {
				if (!value) {
					comparedChartData.value = undefined;
					return;
				}
				comparedChartData.value =
					value === compareOptions[0]
						? {
								name: `Total Return Apple`,
								data: calculateChartData(initialCapital, props.mockData.appl).totalReturnChartData
						  }
						: {
								name: `Total Return ExxonMobil`,
								data: calculateChartData(initialCapital, props.mockData.xom).totalReturnChartData
						  };
			};

			const chartOptionsApex: ApexOptions = {
				chart: {
					id: 'total-return-chart',
					width: '100%'
				},
				xaxis: {
					type: 'datetime'
				},
				yaxis: {
					title: {
						text: 'Return'
					},
					labels: {
						formatter: (label) => `${label} %`
					}
				},
				stroke: {
					show: true,
					curve: 'smooth',
					lineCap: 'butt',
					colors: undefined,
					width: 2,
					dashArray: 0
				}
			};

			const seriesApex = computed(() => [
				comparedChartData.value ?? {
					name: `Capital Gain ${props.companyName}`,
					data: capitalGainChartData
				},
				{
					name: `Total Return ${props.companyName}`,
					data: totalReturnChartData
				}
			]);

			return {chartOptionsApex, seriesApex, compareOptions, handleCompare};
		}
	});
</script>

<template>
	<div class="my-5">
		<h1 class="font-bold">Total Return Chart</h1>
		<div class="my-5 flex justify-end">
			<vue-select :options="compareOptions" placeholder="Compare" class="dropdown" @input="handleCompare"></vue-select>
		</div>
		<apexchart height="500" type="line" :options="chartOptionsApex" :series="seriesApex"></apexchart>
	</div>
</template>

<style>
	.dropdown {
		min-width: 150px;
	}
</style>
