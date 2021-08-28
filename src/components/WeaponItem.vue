<template>
    <div class="item-card">
        <div class="imgs">
            <div class="label">
                <!------------ FOR LB/4B/5B ---------->
                <div>
                    <p class="rarity" :style="setRarityColor('Mythical')">Mythical</p>
                    <p>LB:30/100</p>
                    
                </div>
            </div>
            <!-------------- WEAPON IMAGE------------>
            <img class="weapons" src="../assets/weapons/weapon1.png" alt="">
        </div>
        <div class="desc">
            <!-- <img width="20" :src=`../assets/nav-icons/${elementIcons(weapon.weaponElement)}+.png` alt=""> -->
            <img width="20" :src="require(`../assets/nav-icons/${elementIcons(weapon.weaponElement)}.png`)" alt="">
            <p class="image-name">MALIGNANT SWIFT BLADE</p>
            <p class="battle-power csr-pointer"  id="popover-reactive-1">Batte Power: 11,302 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8z"/><path d="M12 6a3.5 3.5 0 0 0-3.5 3.5a1 1 0 0 0 2 0A1.5 1.5 0 1 1 12 11a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.16A3.49 3.49 0 0 0 12 6z"/><circle cx="12" cy="17" r="1"/></g></svg></p>
            
        </div>

        <!-------------- PROGRESS BAR (User style width percentage (%))------------>
        <div class="progress-bar p-0 m-0">
            <div><div class="progress" style="width: 70% !important;"></div></div>
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

export default Vue.extend({
    name: 'SortFilter',
     props: {
            weapon: {
                type: Object,
                required: true
            }
        },
    methods:{
        elementIcons(num : number) {
            switch (num) {
                case 0:
                    return 'fire';
                case 1:
                    return 'earth';
                case 2:
                    return 'lightning';
                case 3:
                    return 'water';
                default:
                    break;
            }
        },
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
        }
    }
});

</script>

<style scoped>

</style>
