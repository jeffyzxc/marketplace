<template>
	<div class="w-100 pl-4 pr-4" style="height: calc(100vh - 100px);">
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
import SellMyListings from './SellMyListings.vue'
import SellTransactionHistory from './SellTransactionHistory.vue'

export default Vue.extend({
	components: {
		'sell-inventory': SellInventory,
		'sell-mylistings': SellMyListings,
		'sell-transaction-history': SellTransactionHistory,
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
					component: 'sell-mylistings',
				},
				{
					name: 'Transaction History',
					component: 'sell-transaction-history',
				},
			],
		}
	},
})
</script>
