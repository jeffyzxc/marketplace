<template>
	<div class="item-card">
		<div class="imgs">
			<!-------------- NFT IMAGE------------>
			<img class="nft" src="../../assets/nft/1.png" alt="" />
		</div>
		<div class="desc">
			<p class="image-name">BORED MUMMY</p>
			<p class="battle-power csr-pointer" id="popover-reactive-1">
				NFT
			</p>
		</div>

		<!-------------- PROGRESS BAR (User style width percentage (%))------------>
		<div class="lines p-0 m-0">
            <div>.</div>
        </div>
		 <div class="cost-item">
            <div v-if="nft.sellStatus != 0">
                <img width="15" src="../../assets/apple-touch-icon.png" alt="">
                <span>&nbsp; 0.05</span>
            </div>
            <div>
                 <span>#931002</span>
            </div>
        </div>
		<div class="buttons" v-if="nft.sellStatus == 0">
			<p class="btn-sell right csr-pointer mr-2">Sell</p>
			<p class="btn-sell left csr-pointer ml-2" @click="openModal(true)">
				View
			</p>
		</div>
		<div class="buttons" v-if="nft.sellStatus != 0">
			<p class="btn-active right csr-pointer mr-2" v-if="nft.sellStatus == 1">Active</p>
			<p class="btn-sold right csr-pointer mr-2" v-if="nft.sellStatus == 2">Sold</p>
			<p class="btn-sell left csr-pointer ml-2">Cancel</p>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: ['nft']
})
</script>

<style scoped>
.rarity {
	text-transform: capitalize;
}
</style>
