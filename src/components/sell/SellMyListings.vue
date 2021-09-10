<template>
	<div>
		<div class="sell-header">
			<!---- HEADER ---->
			<h4 class="bdr-line-bottom">MY LISTINGS</h4>
		</div>

        <!-- WEAPONS -->
        <div class="bar-label">
            <div class="title-bar">
                <p class="mb-0">WEAPONS</p>
            </div>
        </div>
		<div class="list-items">
			<!----- LOADER--- -->
			<div class="spacer flex-wrap d-flex append-weapon justify-content-center alig-items-center" v-if="isLoading">
				<div class="spinner-border" style="width: 3rem; height: 3rem;color:#ffffff4a" role="status">
					<span class="sr-only"></span>
				</div>
			</div>
            <sell-weapon-list />
		</div>

        <!-- OPEN NFTs -->
        <div class="bar-label">
            <div class="title-bar">
                <p class="mb-0">OPEN NFT</p>
            </div>
        </div>
        <div class="list-items">
			<!----- LOADER--- -->
			<div class="spacer flex-wrap d-flex append-weapon justify-content-center alig-items-center" v-if="isLoading">
				<div class="spinner-border" style="width: 3rem; height: 3rem;color:#ffffff4a" role="status">
					<span class="sr-only"></span>
				</div>
			</div>
            <sell-nft-list />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import SellWeaponList from './SellWeaponList.vue'
import SellNftList from './SellNftList.vue'

export default Vue.extend({
	name: 'SellMyListings',
    components:{ SellNftList,SellWeaponList}
	// data() {
	// 	return {
			
	// 	}
	// },
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

.bar-label{
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
}

.list-items {
	margin-left: 10px !important;
	margin-right: 10px !important;
}
</style>
