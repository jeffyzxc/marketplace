<template>
	<div>
		<div class="spacer flex-wrap d-flex">
			<sell-weapon-item
				v-for="(wl, index) in weaponList"
				:key="'wl' + index"
				:weapon="wl"
			>
			</sell-weapon-item>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
import SellWeaponItem from './SellWeaponItem.vue'

export default Vue.extend({
	components: { SellWeaponItem },
	//passing the filters on props for now...
	// sellStatus --> 0 = Not Listed, 1 = Listed (Active), 2 - Listed (Sold)
	props: ['rarity', 'element', 'stat', 'reforge'],
	data() {
		return {
			weaponList: [
				{ rarity: 'legendary', sellStatus: 0 },
				{ rarity: 'unique', sellStatus: 1 },
				{ rarity: 'rare', sellStatus: 1 },
				{ rarity: 'normal', sellStatus: 2 },
				{ rarity: 'normal', sellStatus: 2 },
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
