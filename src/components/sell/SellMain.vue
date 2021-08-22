<template>
	<div class="w-100 pl-4 pr-4" style="height: calc(100vh - 100px);">
		<div class="banner-ads pt-4 hidden-mobile-sm">
			<!----- BANNER--- -->
			<div class="bg-banner-left"></div>
			<div class="bg-banner-right"></div>
		</div>
		<transition name="fadeInUp" mode="out-in">
			<div
				v-bind:is="this.tabs.find((t) => t.name === this.currentTab).component"
			/>
		</transition>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import SellInventory from './SellInventory.vue'

export default Vue.extend({
	components: {
		'sell-inventory': SellInventory,
	},
	props: ['currentTab'],
	data() {
		return {
			tabs: [
				{
					name: 'Inventory',
					component: 'sell-inventory',
				},
				{
					name: 'My Listings',
					component: '',
				},
				{
					name: 'Transaction History',
					component: '',
				},
			],
		}
	},
})
</script>
