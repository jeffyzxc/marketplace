<template>
    <div>
        <div class="spacer flex-wrap d-flex">
            <character-item v-for="(cl,index) in allCharacters" :key="'cl'+index" :character="cl">

            </character-item>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import CharacterItem from './CharacterItem.vue';

export default Vue.extend({
  components: { CharacterItem },
    name: 'SortFilter',
    methods:{
        ...mapActions(['fetchCharacterList']),
    },
    created() {
        this.fetchCharacterList();
    },
    computed: mapGetters(['allCharacters']),
});
</script>
<style scoped>

</style>