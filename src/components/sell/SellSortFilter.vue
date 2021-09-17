<template>
	<div class="filter-list pt-2 pb-2 align-items-center">
		<div class="sort-tab">
			   <select class="select-metro">
                <option value="stat">Stat</option>
                <option value="rarity">Rarity</option>
                <option value="cost">Cost</option>
                <option value="name">Name</option>
            </select>
            <input type="text" class="select-metro max" placeholder="Min Price">
            <input type="text" class="select-metro min" placeholder="Max Price">
            <div class="form-check" id="form" style="border-right: 1px solid rgba(255, 255, 255, 0.453); padding-right: 20px;">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                <label class="form-check-label" for="defaultCheck1" style="color: rgba(255, 255, 255, 0.453);font-size: 13px;font-family: Roboto;">Show Sold</label>
            </div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'SellSortFilter',
	methods: {
		showFilters() {
			this.$root.$emit('filter-value', true)
		},
	},
})
</script>

<style scoped></style>
