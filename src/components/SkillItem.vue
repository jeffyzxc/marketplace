<template>
    <div class="item-card d-flex flex-column">
        <div class="imgs text-center flex-grow-1 d-flex justify-content-center align-items-center" v-if="isTypeSkills(skill.type)">
            <img class="characters" width="120" :src="getSkillImage(skill.image)" alt="">
        </div> 

        <div class="imgs text-center flex-grow-1 d-flex justify-content-center align-items-center" v-if="isTypeLand(skill.type)">
            <img class="characters" width="120" :src="getLandImage(skill.image)" alt="">
        </div> 

        <div class="imgs text-center flex-grow-1" v-if="isTypeWeaponCosmetic(skill.type)">
            <div class="animation" v-bind:class="'weapon-animation-applied-' + skill.id" />
            <img class="weapon-placeholder" width="120" :src="getWeaponPlaceholderImage()" v-bind:class="'weapon-cosmetic-applied-' + skill.id">
        </div> 

        <div class="imgs text-center flex-grow-1" 
            v-if="isTypeCharacterCosmetic(skill.type)"
        >
            <div v-bind:class="['character-cosmetic-applied-' + skill.id, 'character-animation-applied-' + skill.id]">
                <div class="animation" />
                <img class="character-placeholder" width="120" :src="getCharacterPlaceholderImage()">
            </div>
        </div>

        <div class="imgs text-center flex-grow-1" v-if="isTypeShield(skill.type)">
            <img width="120" :src="getShieldPlaceholderImage()" alt="">
        </div> 
        
        <div class="desc">
            <p class="image-name mt-2">{{ skill.name }}</p>
            <p class="battle-power csr-pointer" id="popover-reactive-1">Misc</p>
        </div>
        <div class="lines p-0 m-0">
            <div>.</div>
        </div>
        <div class="cost-item">
            <div>
                <img width="15" src="../assets/apple-touch-icon.png" alt="">
                <span>&nbsp; {{ skill.nftPrice }}</span>
            </div>
            <div>
            </div>
        </div>
        <div class="buttons">
             <p class="btn-purchase right csr-pointer mr-2">Purchase</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import './../mixins/skill-shop-mixins';
import { skillShopMixins } from './../mixins/skill-shop-mixins';

const vm = Vue.extend({
    name: 'SortFilter',
    props: ['skill'],
    methods:{
        ...skillShopMixins.methods,
        openModal(bol:boolean){
            this.$root.$emit('modal',bol)
        },
        getSkillImage(imageFileName: string) {
            return require(`../assets/skill/${imageFileName}`);
        },
        getLandImage(imageFileName: string) {
            return require(`../assets/land/${imageFileName}`);
        },
        getWeaponPlaceholderImage() {
            return require('../assets/placeholder/sword-placeholder-0.png');
        },
        getCharacterPlaceholderImage() {
            return require('../assets/characters/chara-0.png');
        },
        getShieldPlaceholderImage() {
            return require("../assets/shields/shield2.png");
        }
    }
});

export default vm;

</script>

<style scoped>
    @import '../styles/character-cosmetics.css';
    @import '../styles/weapon-cosmetics.css';

    .item-card {
        flex-basis: 12em;
    }

    .imgs {
        position: relative;
        overflow: hidden;
    } 

    .animation {
        width: 100%;
        height: 100%;
    } 

    .character-animation-applied-13 .animation {
        width: 0;
        height: 0;
    } 

    .weapon-animation-applied-13 {
        width: 0;
        height: 0;
    }

    .weapon-placeholder {
        transform: scale(0.9);
    }

    .character-placeholder {
        margin-top: 5px;
        transform: scale(0.8);
    }
    
</style>
