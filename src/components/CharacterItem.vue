<template>
    <div class="item-card">
        <div class="imgs text-center">
            <!-- <div class="label"> -->
                <!------------ FOR RARITY ---------->
                <!-- <div>
                    <p class="rarity" :style="setRarityColor('Mythical')">Mythical</p>
                </div> -->
            <!-- </div> -->
            <!-------------- CHARACTER IMAGE------------>
            <img class="characters" width="80" :src="getCharacterArt(character.charId)" style="height: 151px" alt="">
        </div>
        <div class="desc">
            <img width="20" :src="require(`../assets/nav-icons/${character.charElement.toLowerCase()}.png`)" alt="">
            <p class="image-name">
                <!-- GARETH BALE BENZEMA -->
                {{ getCleanCharacterName(character.charId) }}
            </p>
            <p class="battle-power csr-pointer"  id="popover-reactive-1">Level {{ character.charLevel }}</p>
            
        </div>

        <!-------------- PROGRESS BAR (User style width percentage (%))------------>
        <div class="progress-bar p-0 m-0">
            <div><div class="progress" style="width: 70% !important;"></div></div>
        </div>
        
        <div class="cost-item">
            <div>
                <img width="15" src="../assets/apple-touch-icon.png" alt="">
                <span>&nbsp; {{ character.price }}</span>
            </div>
            <div>
                 <span>#{{character.charId}}</span>
            </div>
        </div>
        <div class="buttons">
             <p class="btn-purchase right csr-pointer mr-2" @click="purchaseCharacter(character.charId)">Purchase</p>
             <p class="btn-purchase left csr-pointer ml-2" @click="openModal(true)">View</p>
        </div>

         <b-popover
            target="popover-reactive-1"
            triggers="click"
            placement="left"
            container="my-container"
            >

            <div class="popover-design">
                <p>Total Battle Power</p>
                <h4>11,302</h4>
                <div class="traits">
                    <img width="10" src="../assets/nav-icons/fire.png" alt="">
                    &nbsp;<span>Power</span><br>
                    <img width="10" src="../assets/nav-icons/lightning.png" alt="">
                    &nbsp;<span>Strength</span><br>
                    <img width="10" src="../assets/nav-icons/water.png" alt="">
                    &nbsp;<span>Intelligence</span>
                </div>
                <div class="learn">
                    Learn About Battle Powers
                </div>
            </div>
    </b-popover>

    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { getCleanName } from './../utils/rename-censor';
import { getCharacterArt } from './../utils/character-arts-placeholder';

interface StoreMappedActions {
    purchaseCharactersListing(payload: { tokenId: number, maxPrice: string }): Promise<{ seller: string, nftID: string, price: string }>;
    fetchCharactersNftPrice(payload: { tokenId: number }): Promise<string>;
}

export default Vue.extend({
    name: 'SortFilter',
    props: {
        character: {
            type: Object,
            required: false
        }
    },
    methods:{
        ...(
        mapActions([
            'purchaseCharactersListing',
            'fetchCharactersNftPrice',
        ]) as StoreMappedActions),

        getCharacterArt,

        setRarityColor(rarity:string){
            if(rarity == 'Mythical'){
                return 'background-color:#D16100 !important'
            }else if(rarity == 'Legendary'){
                 return 'background-color:#7C1EC1 !important'
            }
            else if(rarity == 'Rare'){
                 return 'background-color:#3997F5 !important'
            }
            else if(rarity == 'Normal'){
                 return 'background-color:#43506A !important'
            }
        },
        openModal(bol:boolean){
            this.$root.$emit('modal',bol)
        },
          async purchaseCharacter(characterId: number){
              characterId = 1; // for testing purposes. API not finished yet just finishing ABI
             const price = await this.lookupCharactersPrice(characterId);
            if(!price) return;
            
            await this.purchaseCharactersListing({
                tokenId: characterId,
                maxPrice: price
            });
        },
        getCleanCharacterName(id:number) {
            return getCleanName(this.getCharacterName(id));
        },
        async lookupCharactersPrice(id: number) {
            return await this.fetchCharactersNftPrice({
                tokenId: id
            }); 
        },
    },
    computed: {
        ...mapGetters(
            [
                'getCharacterName',
                'getCharacterStamina'
            ]
        )
    }
});

</script>

<style scoped>

</style>