<template>
	<b-container class="bv-example-row" fluid>
		<b-row class="sell-main">
			<transition name="fadeInUp" mode="out-in">
				<b-col
					lg="2"
					md="3"
					sm="12"
					class="sell-sidebar"
					v-if="!isMobile || (isMobile && filterIsToggled)"
				>
					<sell-side-bar @selectEvent="handleOnSelect" />
				</b-col>
			</transition>
			<transition name="fadeInUp" mode="out-in">
				<b-col
					lg="10"
					md="9"
					sm="12"
					class="bdr-line-left item-list ps-container ps-active-y overflow-auto"
					v-if="!isMobile || (isMobile && !filterIsToggled)"
				>
					<sell-main :currentTab="currentTab"></sell-main>
				</b-col>
			</transition>
		</b-row>
	</b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import SellSideBar from '../components/sell/SellSideBar.vue'
import SellMain from '../components/sell/SellMain.vue'

export default Vue.extend({
	name: 'Sell',
	created() {
		this.currentTab = 'Inventory'
	},
	data() {
		return {
			currentTab: '',
			filterIsToggled: false,
			isLoading: false,
		}
	},
	components: {
		SellMain,
		SellSideBar,
	},
	computed: {
		isMobile() {
			if (screen.width <= 600) {
				return true
			} else {
				return false
			}
		},
	},
	mounted() {
		this.$root.$on('set-toggle', (data: boolean) => {
			this.filterIsToggled = data
		})
	},
	methods: {
		handleOnSelect(tab: any) {
			this.currentTab = tab
		},
	},
})
</script>

<style>
.sell-sidebar {
	border-right: 1px solid rgba(57, 67, 85, 1);
	height: calc(100vh - 150px) !important;
	overflow-y: auto !important;
	padding-right: 0px !important;
}
</style>
