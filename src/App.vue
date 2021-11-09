<script>
	import {defineComponent} from '@vue/composition-api';

	import AppHeader from './components/AppHeader.vue';
	import TotalReturnChart from './components/TotalReturnChart.vue';

	export default defineComponent({
		components: {AppHeader, TotalReturnChart}
	});
</script>

<template>
	<div id="app">
		<app-header class="app-header" />
		<total-return-chart />
	</div>
</template>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	.app-header {
		@apply flex items-center justify-center;
	}
</style>
