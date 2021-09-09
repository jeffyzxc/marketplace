<template>
	<div>
		<div class="sell-header">
			<!---- HEADER ---->
			<h4 class="bdr-line-bottom">INVENTORY</h4>
		</div>
		<div class="tab-list d-flex justify-content-between">
			<button class="csr-pointer" v-bind:class=" tab.name == currentTab.name ? 'cstm-btn-active' : 'cstm-btn'" v-for="tab in tabs" :key="tab.name" @click="selectTab(tab)">
				<span v-if="isMobile" v-html="tab.icon"></span>
				<p v-else class="mb-0">{{ tab.name }}</p>
			</button>
		</div>
		<div class="filtered">
			<sell-sort-filter />
		</div>
		<div class="list-items">
			<!----- LOADER--- -->
			<div class="spacer flex-wrap d-flex append-weapon justify-content-center alig-items-center" v-if="isLoading" >
				<div class="spinner-border" style="width: 3rem; height: 3rem;color:#ffffff4a" role="status" >
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

var tabs = [
	{
		name: 'Weapons',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.8em" height="1.8em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M15.8.5l-.1-.2l-.2-.1c-.1 0-2.5-.8-4.2.9L4.6 7.7c-.9-.6-1.7-1.2-1.8-1l-.4.3c-.2.2.9 1.7 1.8 2.7l-2.5 3.4c-.3-.3-.8-.3-1.1 0l-.3.3c-.3.3-.3.8 0 1.1l1 1c.3.3.8.3 1.1 0l.3-.3c.3-.3.3-.8 0-1.1l3.5-2.5c1 .9 2.5 2 2.7 1.8l.4-.4c.1-.1-.4-1-1.1-1.8l6.7-6.7c1.7-1.5.9-3.9.9-4zm-8.1 10l-.8-.8l6.2-6.9L6.2 9l-.7-.7L12 1.8c1-1 2.3-.8 2.9-.7c.1.6.3 1.9-.7 2.8l-6.5 6.6z"/></svg>',
		component: 'sell-weapon-list',
	},
	{
		name: 'Shields & Armors',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.8em" height="1.8em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 17 17"><path d="M3.068 1.976l.005 6.042c0 4.988 5.948 7.961 5.948 7.961s5.95-2.807 5.95-7.977l.001-6.026S12.308.036 9.021.036c-3.289 0-5.953 1.94-5.953 1.94zm10.979 6.255c0 3.944-4.723 6.682-5.045 6.837v.015l-.015-.007l-.015.007v-.015c-.322-.155-5.045-2.893-5.045-6.837l-.004-5.664S6.181.992 8.972.979V.978l.015.001l.015-.001v.001c2.791.013 5.049 1.588 5.049 1.588l-.004 5.664zm-1.108.16c0 3.435-3.671 5.462-3.922 5.597V14s-.01-.004-.011-.006L8.994 14v-.013c-.251-.135-3.921-2.162-3.921-5.597l-.004-4.929s1.756-1.37 3.925-1.382h.023c2.17.012 3.924 1.382 3.924 1.382l-.002 4.93z" fill="currentColor" fill-rule="evenodd"/></svg>',
		component: {
			template: '<sell-weapon-list />',
		},
	},
	{
		name: 'Characters',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.8em" height="1.8em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="currentColor"><path d="M3 14s-1 0-1-1s1-4 6-4s6 3 6 4s-1 1-1 1H3zm5-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6z"/></g></svg>',
		component: {
			template: '<sell-weapon-list />',
		},
	},
	{
		name: 'Other NFT',
		icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.8em" height="1.8em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M9 7h2l2 5V7h2v10h-2l-2-5v5H9V7M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m0 2v14h14V5H5z" fill="currentColor"/></svg>',
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
	},
	data() {
		return {
			tabs: tabs,
			currentTab: tabs[0],
			filterIsToggled: false,
			isLoading: false,
		}
	},
	computed:{
		isMobile() {
          if( screen.width <= 600) {
            return true;
          }
          else {
            return false;
          }
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
