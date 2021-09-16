<template>
    <div>
        <div class="spacer flex-wrap d-flex">
            <character-item v-for="(cl,index) in characterList" :key="'cl'+index" :character="cl">

            </character-item>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import CharacterItem from './CharacterItem.vue';

export default Vue.extend({
  components: { CharacterItem },
    name: 'SortFilter',
    data (){
        return {
            characterList:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        }
    },
    methods:{
        fetchCharacters(){
            return;
        }
    }
});
</script>
<style scoped>

</style>