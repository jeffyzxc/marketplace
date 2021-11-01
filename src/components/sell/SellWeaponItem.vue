<template>
	<div class="item-card">
		<div class="imgs">
			<div class="label">
				<!------------ FOR LB/4B/5B ---------->
				<div>
					<p class="rarity" :style="setRarityColor(weapon.rarity)">
						{{ weapon.rarity }}
					</p>
					<p>LB:30/100</p>
				</div>
			</div>
			<!-------------- WEAPON IMAGE------------>
			<img class="weapons" src="../../assets/weapons/weapon3.png" alt="" />
		</div>
		<div class="desc">
			<img width="20" src="../../assets/nav-icons/fire.png" alt="" />
			<p class="image-name">MALIGNANT SWIFT BLADE</p>
			<p class="battle-power csr-pointer" id="popover-reactive-1">
				Battle Power: 11,302
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8z"/><path d="M12 6a3.5 3.5 0 0 0-3.5 3.5a1 1 0 0 0 2 0A1.5 1.5 0 1 1 12 11a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.16A3.49 3.49 0 0 0 12 6z" /><circle cx="12" cy="17" r="1" /></g></svg>
			</p>
		</div>

		<!-------------- PROGRESS BAR (User style width percentage (%))------------>
		<div class="progress-bar p-0 m-0">
			<div><div class="progress" style="width: 70% !important;"></div></div>
		</div>
		 <div class="cost-item">
            <div v-if="weapon.sellStatus !== 0">
                <img width="15" src="../../assets/apple-touch-icon.png" alt="">
                <span>&nbsp; 1.2</span>
            </div>
            <div>
                 <span>#931002</span>
            </div>
        </div>
		<div class="buttons" v-if="weapon.sellStatus === 0">
			<p class="btn-sell right csr-pointer mr-2" @click="sellItemModal()">Sell</p>
			<p class="btn-sell left csr-pointer ml-2" @click="openModal(true)">
				View
			</p>
		</div>
		<div class="buttons" v-if="weapon.sellStatus !== 0">
			<p class="btn-active right csr-pointer mr-2" v-if="weapon.sellStatus === 1">Active</p>
			<p class="btn-sold right csr-pointer mr-2" v-if="weapon.sellStatus === 2">Sold</p>
			<p class="btn-sell left csr-pointer ml-2">Cancel</p>
		</div>
		<b-popover target="popover-reactive-1" triggers="click" placement="left" container="my-container">
			<div class="popover-design">
				<p>Total Battle Power</p>
				<h4>11,302</h4>
				<div class="traits">
					<img width="10" src="../../assets/nav-icons/fire.png" alt="" />
					&nbsp;<span>Power</span><br />
					<img width="10" src="../../assets/nav-icons/lightning.png" alt="" />
					&nbsp;<span>Strength</span><br />
					<img width="10" src="../../assets/nav-icons/water.png" alt="" />
					&nbsp;<span>Intelligence</span>
				</div>
				<div class="learn">
					Learn About Battle Powers
				</div>
			</div>
		</b-popover>

		<b-modal class="modal-body" size="xl" hide-header hide-footer ref="sellItem">
			<sell-weapons-modal/>
			<a @click="hideItemModal"><svg class='close closeButton' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="2.4em" height="2.4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12z" fill="#43506A"/><path d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z" fill="#FFFFFF"/></svg>
			</a>
		</b-modal>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BModal } from 'bootstrap-vue';
import SellWeaponsModal from "@/components/sell/SellWeaponsModal.vue";

export default Vue.extend({
	components: { SellWeaponsModal },
	props: ['weapon'],
	methods: {
		setRarityColor(rarity: string) {
			switch (rarity) {
				case 'legendary':
					return 'background-color:#D16100 !important';
				case 'mythical':
					return 'background-color:#7C1EC1 !important';
				case 'unique':
					return 'background-color:#7ba224 !important';
				case 'rare':
					return 'background-color:#3997F5 !important';
				// Normal
				default:
					return 'background-color:#43506A !important'
			}
		},
		openModal(bol: boolean) {
			this.$root.$emit('modal', bol)
		},

		sellItemModal() {
			(this.$refs['sellItem'] as BModal).show();
		},
		hideItemModal() {
			(this.$refs['sellItem'] as BModal).hide();
		},
	},
})
</script>

<style scoped>
.rarity {
	text-transform: capitalize;
}
</style>
