<template>
	<div>
		<div class="d-flex flex-column">
			<button
				class="csr-pointer"
				v-bind:class="tab == currentTab ? 'sidebar-btn-active' : 'sidebar-btn'"
				v-for="tab in tabs"
				:key="tab"
				@click="handleOnClick(tab)"
			>
				{{ tab }}
			</button>
			<div class="log-out csr-pointer">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					aria-hidden="true"
					role="img"
					width="1em"
					height="1em"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 24 24"
				>
					<path
						d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4l5-4v3z"
						fill="currentColor"
					/>
				</svg>
				<span @click="logOut()">Logout</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import detectEthereumProvider from "@metamask/detect-provider";
import {store} from "@/store";

var tabs = ['Inventory', 'My Listings', 'Transaction History']

export default Vue.extend({
	name: 'SellSideBar',
	data() {
		return {
			tabs: tabs,
			currentTab: tabs[0],
		}
	},
	methods: {
		handleOnClick(tab: any) {
			this.currentTab = tab
			this.$emit('selectEvent', tab)
		},

		logOut: async () => {
			try {
				const provider = await detectEthereumProvider() as any;
				if (provider) {
					console.log('Ethereum successfully detected!');
					const accounts = await provider.request({
						method: 'eth_requestAccounts',
						params: [
							{
								eth_accounts: {}
							}
						] });
					store.commit('setDefaultAaccount', accounts[0]);
					store.commit('setMetamaskConnected', false);
				}
			} catch (err) {
				console.error('Logout Failure:', err)
			}
		},
	},
})
</script>

<style scoped>
.sidebar-btn:hover {
	background-color: #1168d0 !important;
	transition: background-color 0.3s;
}
</style>
