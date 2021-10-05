<template>
	<b-pagination
      v-model="curPage"
      :total-rows="totalItems"
      :per-page="itemsPerPage"
	  v-on:change="onChangePage($event)">
    ></b-pagination>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: ['totalRows', 'perPage'],
	name: 'CryptobladesPagination',
	components: {},
	data() {
      return { 
          itemsPerPage : this.perPage,
		  totalItems: this.totalRows,
		  curPage: 1
	  }
    },
	methods: {
		onChangePage(page: number) {
			this.$emit('changes', page)
		}
	}
})
</script>

<style scoped>

	::v-deep .page-item {
		margin-right: 0.5rem;
		font-size: 0.75rem;
	}

	::v-deep .page-item.active .page-link {
		background: #43506A !important;
		border: 1px solid #43506A !important;
		color: #FFFFFF;
	}
	
	::v-deep .page-item .page-link {
		color: #FFFFFF !important;
		background: #FFFFFF00 !important;
		border: 1px solid #43506A !important;
	}

	::v-deep .page-link {
		border-radius: 5px !important;
	}

</style>
