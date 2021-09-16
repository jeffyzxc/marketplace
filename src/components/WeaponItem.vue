<template>
    <div class="item-card">
        <div class="imgs">
            <div class="label">
                <!------------ FOR LB/4B/5B ---------->
                <div>
                    <p class="rarity" :style="setRarityColor(weapon.weaponStars)">{{setRarityName(weapon.weaponStars)}}</p>
                    <p>LB:30/100</p>
                    
                </div>
            </div>
            <!-------------- WEAPON IMAGE------------>
            <img class="weapons" :src="getWeaponArt(weapon)" alt="">
            <!-- <img class="weapons" :src="require(`../assets/weapons/weapon1.png`)" alt=""> -->

        </div>
        <div class="desc">
            <!-- <img width="20" :src=`../assets/nav-icons/${elementIcons(weapon.weaponElement)}+.png` alt=""> -->
            <img width="20" :src="require(`../assets/nav-icons/${(weapon.weaponElement).toLowerCase()}.png`)" alt="">

            <!-- Change the Math Random to weaponStar if data from api is working properly -->
            <p class="image-name">{{getWeaponNameFromSeed(weapon.weaponId, weapon.weaponStars)}}</p>
            <p class="battle-power csr-pointer"  :id="weapon.weaponId">Batte Power: {{addCommas(totalBattlePower(weapon))}} <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8z"/><path d="M12 6a3.5 3.5 0 0 0-3.5 3.5a1 1 0 0 0 2 0A1.5 1.5 0 1 1 12 11a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.16A3.49 3.49 0 0 0 12 6z"/><circle cx="12" cy="17" r="1"/></g></svg></p>
            
        </div>

        <!-------------- PROGRESS BAR (User style width percentage (%))------------>
        <div class="progress-bar p-0 m-0 csr-pointer">
            <div><div class="progress" :style="'width:'+randomStamina()+'% !important;'"></div></div>
        </div>
        <div class="cost-item">
            <div>
                <img width="15" src="../assets/apple-touch-icon.png" alt="">
                <span>&nbsp; {{weapon.price}}</span>
            </div>
            <div>
                 <span>#{{weapon.weaponId}}</span>
            </div>
        </div>
        <div class="buttons">
             <p class="btn-purchase right csr-pointer mr-2">Purchase</p>
             <p class="btn-purchase left csr-pointer ml-2" @click="openModal('item-modal', weapon)">View</p>
        </div>

         <b-popover
            :target='weapon.weaponId'
            triggers="hover focus"
            placement="placement"
            container="my-container"
            >
            <div class="popover-design">
                <p>Total Battle Power</p>
                <h4>{{addCommas(totalBattlePower(weapon))}}</h4>
                <div class="traits">
                    <img width="10" v-if="weapon.stat1Element != ''" src="../assets/nav-icons/fire.png" alt="">
                    <span  v-if="weapon.stat1Element != ''">{{weapon.stat1Value}}<br></span>
                    <img width="10" v-if="weapon.stat2Element != ''" src="../assets/nav-icons/lightning.png" alt="">
                    <span v-if="weapon.stat2Element != ''">{{weapon.stat2Value}}<br></span>
                    <img width="10" v-if="weapon.stat3Element != ''" src="../assets/nav-icons/water.png" alt="">
                    <span v-if="weapon.stat3Element != ''">{{weapon.stat3Value}}</span>
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
import { getWeaponNameFromSeed } from '../weapon-names';
import { getWeaponArt } from '../weapon-arts-placeholder'

export default Vue.extend({
    name: 'SortFilter',
     props: {
            weapon: {
                type: Object,
                required: true
            }
        },
    methods:{
        getWeaponArt,
        getWeaponNameFromSeed,
        elementIcons(element : string) {
            return element.toLowerCase
        },
        setRarityName(rarity:number){
            if(rarity == 4){
                return 'Mythical'
            }else if(rarity == 3){
                 return 'Legendary'
            }
            else if(rarity == 2){
                 return 'Epic'
            }
            else if(rarity == 1){
                 return 'Rare'
            }
            else if(rarity == 0){
                 return 'Normal'
            }
        },
        totalBattlePower(weapon:any){
            return weapon.stat1Value + weapon.stat2Value + weapon.stat3Value;
        },
        setRarityColor(rarity:number){
            if(rarity == 4){
                return 'background-color:#D16100 !important'
            }else if(rarity == 3){
                 return 'background-color:#7C1EC1 !important'
            }
            else if(rarity == 2){
                 return 'background-color:#7ba224 !important'
            }
            else if(rarity == 1){
                 return 'background-color:#3997F5 !important'
            }
            else if(rarity == 0){
                 return 'background-color:#43506A !important'
            }
        },
        randomStamina(){
           return Math.floor(Math.random() * 100) + 30;
        },
        openModal(modal:string, data:any){
            this.$root.$emit('modal', {modalName:modal, modalData:data})
        },
        addCommas(nStr:any){
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }
    },
    // mounted(){
    //     console.log((this.getWeaponArt(this.$props.weapon))?.substring(0,7))
    //     console.log(this.$props.weapon)
    //     console.log(getWeaponNameFromSeed(2,2))
    // }
});

</script>

<style scoped>

</style>
