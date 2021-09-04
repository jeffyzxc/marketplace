<template>
	<div>
		<div class="spacer flex-wrap d-flex">
			<sell-nft-item
				v-for="(nf, index) in nftList"
				:key="'nf' + index"
				:nft="nf"
			>
			</sell-nft-item>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
import SellNftItem from './SellNftItem.vue'

export default Vue.extend({
	components: { SellNftItem },
	//passing the filters on props for now...
	// sellStatus --> 0 = Not Listed, 1 = Listed (Active), 2 - Listed (Sold)
	data() {
		return {
			nftList: [
				{ sellStatus: 0 },
				{ sellStatus: 1 },
				{ sellStatus: 1 },
				{ sellStatus: 2 },
				{ sellStatus: 2 },
			],
		}
	},
	methods: {
		fetchWeapons() {
			return
		},
	},
})
</script>
<style scoped></style>
