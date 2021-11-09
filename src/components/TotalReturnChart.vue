<script lang="ts">
	import {defineComponent} from '@vue/composition-api';

	import showData from '../mockData';

	export default defineComponent({
		setup() {
			showData();
			return {};
		}
	});
</script>

<template>
	<div class="my-5">
		<h1 class="font-bold">Total Return Chart</h1>
	</div>
</template>
