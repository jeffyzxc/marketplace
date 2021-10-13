<template>
	<div>
		<div class="spacer flex-wrap d-flex">
			<shield-item
				v-for="(shield, index) in allShields"
				:key="'shield' + index"
				:shield="shield"
			>
			</shield-item>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import ShieldItem from './ShieldItem.vue'
import { store } from '../store/index';
import  { mapActions, mapGetters } from 'vuex';
import { IMarketFilter } from '@/interface/filters.interface';
export default Vue.extend({
	components: { 'shield-item': ShieldItem },
	//passing the filters on props for now...
	// sellStatus --> 0 = Not Listed, 1 = Listed (Active), 2 - Listed (Sold)
	props: ['rarity', 'element', 'stat', 'reforge'],
	data() {
		return {
			filterIsToggled: {},
		}
	},
	mounted(){
        this.fetchShieldsList();
	},
	created(){
		this.$root.$on('filter-value', (data: IMarketFilter) => {
            this.filterIsToggled = data;

			console.log(data.elementFilter);

            // store.commit({
            //     type: 'setShieldListFilter',
            //     filter: this.filterIsToggled
            // });

            this.fetchShieldsList();
        });
	},
    computed: mapGetters(['allShields']),
	methods: {
		...mapActions(['fetchShieldsList']),
	},
	
})
</script>
<style scoped></style>
