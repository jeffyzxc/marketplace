<template>
    <div class="item-card">
        <div class="imgs text-center">
            <img class="characters" width="80" :src="getCharacterArt(character)" style="height: 151px" alt="">
        </div>
        <div class="desc">
            <img width="20" :src="require(`../assets/nav-icons/${character.traitName.toLowerCase()}.png`)" alt="">
            <p class="image-name">
                {{ getCleanCharacterName(character.id) }}
            </p>            
        </div>

        <!-------------- PROGRESS BAR (User style width percentage (%))------------>
        <div class="progress-bar p-0 m-0">
            <div><div class="progress" 
             :style="`--staminaReady: ${(timestampToStamina(character.staminaTimestamp)/CHARACTER_MAX_STAMINA)*100}%;`"
                v-b-popover.hover.bottom="staminaToolTipHtml()"
             ></div></div>
        </div>
        
        <div class="cost-item">
            <div>
                <img width="15" src="../assets/apple-touch-icon.png" alt="">
                <span v-b-popover.hover.top="untruncatedPrice + ' ' + 'SKILL'" >&nbsp; {{ truncatePrice }} </span>
            </div>
            <div>
                 <span>#{{character.id}}</span>
            </div>
        </div>

        <div class="buttons">
            <p class="btn-purchase right csr-pointer mr-2" @click="purchaseCharacter(character.id)">Purchase</p>
            <p class="btn-purchase left csr-pointer ml-2" @click="openModal(true)">View</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { getCleanName } from './../utils/rename-censor';
import { getCharacterArt } from './../utils/character-arts-placeholder';
import { CHARACTER_MAX_STAMINA } from '@/default/character.default';
import { fromWeiEther } from '@/utils/common';
import { truncateDecimals } from '@/utils/currency-converter';

interface StoreMappedActions {
    purchaseCharactersListing(payload: { tokenId: number, maxPrice: string }): Promise<{ seller: string, nftID: string, price: string }>;
    fetchCharactersNftPrice(payload: { tokenId: number }): Promise<string>;
}

export default Vue.extend({
    name: 'SortFilter',
    data() {
        return {
            truncatePrice: "loading..",
            untruncatedPrice: "loading..",
            CHARACTER_MAX_STAMINA: CHARACTER_MAX_STAMINA
        }
    },
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
            'fetchMarketNftPrice'
        ])),

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
        timestampToStamina(timestamp: number) {
            if(timestamp > Math.floor(Date.now()/1000)) return 0;
            return +Math.min((Math.floor(Date.now()/1000) - timestamp) / 300, 200).toFixed(0);
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
        async lookUpCharacterPrice(id: string) {
            if (!this.characterContractAddress) return;

            return await this.fetchMarketNftPrice({
                nftContractAddr: this.characterContractAddress,
                tokenId: id,
            });
        },
        staminaToolTipHtml() {
            return `STA ${this.timestampToStamina(this.character.staminaTimestamp)} / ${CHARACTER_MAX_STAMINA}`;
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
    async created() {
        this.untruncatedPrice = fromWeiEther((await this.lookUpCharacterPrice(this.character.id)).toString());
        this.truncatePrice = truncateDecimals(this.untruncatedPrice);
    },
    computed: {
        ...mapGetters(
            [
                'characterContractAddress',
                'getCharacterName',
                'getCharacterStamina',
                'timeUntilCharacterHasMaxStamina'
            ]
        )
    }
});

</script>

<style scoped>
</style>