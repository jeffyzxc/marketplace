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
	props: ['rarity', 'element', 'stat', 'reforge'],
	data() {
		return {
			weaponList: [
				{ rarity: 'legendary' },
				{ rarity: 'legendary' },
				{ rarity: 'legendary' },
				{ rarity: 'mythical' },
				{ rarity: 'mythical' },
				{ rarity: 'unique' },
				{ rarity: 'rare' },
				{ rarity: 'rare' },
				{ rarity: 'normal' },
				{ rarity: 'normal' },
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
