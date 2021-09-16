<template>
	<div>
		<div class="sell-header">
			<!---- HEADER ---->
			<h4 class="bdr-line-bottom">INVENTORY</h4>
		</div>
		<div class="tab-list d-flex justify-content-between">
			<button
				class="csr-pointer"
				v-bind:class="
					tab.name == currentTab.name ? 'cstm-btn-active' : 'cstm-btn'
				"
				v-for="tab in tabs"
				:key="tab.name"
				@click="selectTab(tab)"
			>
				{{ tab.name }}
			</button>
		</div>
		<div class="filtered">
			<sell-sort-filter />
		</div>
		<div class="list-items">
			<!----- LOADER--- -->
			<div
				class="spacer flex-wrap d-flex append-weapon justify-content-center alig-items-center"
				v-if="isLoading"
			>
				<div
					class="spinner-border"
					style="width: 3rem; height: 3rem;color:#ffffff4a"
					role="status"
				>
					<span class="sr-only"></span>
				</div>
			</div>

			<div v-bind:is="currentTab.component" v-else />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import SellWeaponList from './SellWeaponList.vue'
import SellSortFilter from './SellSortFilter.vue'
import SellShieldsAndArmorsList from './SellShieldsAndArmorsList.vue'

var tabs = [
	{
		name: 'Weapons',
		component: 'sell-weapon-list',
	},
	{
		name: 'Shields & Armors',
		component: 'sell-shields-and-armors-list',
	},
	{
		name: 'Characters',
		component: {
			template: '<sell-weapon-list />',
		},
	},
	{
		name: 'Other NFT',
		component: {
			template: '<sell-weapon-list />',
		},
	},
]

export default Vue.extend({
	name: 'SellInventory',
	components: {
		SellSortFilter,
		'sell-weapon-list': SellWeaponList,
		'sell-shields-and-armors-list': SellShieldsAndArmorsList
	},
	data() {
		return {
			tabs: tabs,
			currentTab: tabs[0],
			filterIsToggled: false,
			isLoading: false,
		}
	},
	methods: {
		selectTab(tab: any) {
			this.currentTab = tab
		},
	},
})
</script>

<style scoped>
.tab-list {
	margin: 1em 10px;
}

.tab-list button {
	padding: 2em 1em;

	text-transform: uppercase;
	color: #fff;
	font-weight: 700;
	font-size: 14px;
}

.tab-list .cstm-btn {
	background-color: #253148 !important;
}

.tab-list .cstm-btn:hover {
	background-color: #1168d0 !important;
	transition: background-color 0.3s;
}

.tab-list button:not(:last-child) {
	margin-right: 1em;
}

.sell-header {
	color: white;
}

.sell-header h4 {
	padding-bottom: 15px;
	margin: 1em 10px;
}

.list-items {
	margin-left: 10px !important;
	margin-right: 10px !important;
}
</style>
