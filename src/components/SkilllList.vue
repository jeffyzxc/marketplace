<template>
    <div>
        <div class="spacer flex-wrap d-flex">
            <skill-item v-for="(sl,index) in skillList" :key="'sl'+index">

            </skill-item>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import SkillItem from './SkillItem.vue';
import Pagination from './../components/dumb/crypblades-pagination.vue';

export default Vue.extend({
    components: { 
      SkillItem
    },
    name: 'SortFilter',
    data (){
        return {
            skillList:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        }
    },
    methods:{
        fetchSkills(){
            return;
        }
    }
});
</script>
<style scoped>

</style>