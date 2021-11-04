<template>
        <div class="modal-details">
            <div class="modal-contianer">
                <svg class='close' @click="closeModal('',item)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="2.4em" height="2.4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" fill="#08142b"><path d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12z" fill="#43506A"/><path d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z" fill="#FFFFFF"/></svg>
            <div class="row">
                <div class="col-lg-5">
                    <img width='100%' class='image-fluid' :src="getWeaponArt(item)" alt="">
                </div>
                <div class="col-lg-7">
                    <div class="row">
                        <div class="col-lg-12 rarities">
                            <img width='30'  :src="require(`../../assets/nav-icons/${(item.element).toLowerCase()}.png`)" alt="">
                            <span :style="setRarityColor(item.stars)">{{setRarityName(item.stars)}}</span>
                        </div>
                        <div class="col-lg-12 titles">
                            <h4>{{(getWeaponNameFromSeed(item.id,item.stars)).toUpperCase()}}</h4>
                            <div class="d-flex">
                                <p class="r">Battles Power: {{addCommas(totalBattlePower(item))}}</p>
                                <p class="l">Reforge Bonus: 2,500</p>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="progress-bar p-0 m-0">
                                <div><div class="progress" :style="'width:'+randomStamina()+'% !important;'"></div></div>
                            </div>
                        </div>
                        <div class="col-lg-12 pt-2">
                            <div class="row">
                            <div class="col-lg-3 powers" v-if="item.stat1Element != ''">
                                <span><img width='12' src="../../assets/nav-icons/lightning.png" alt="">&nbsp;POWER</span>
                                <p>+{{item.stat1Value}}</p>
                            </div>
                            <div class="col-lg-3 powers"  v-if="item.stat2Element != ''">
                                <span><img width='12' src="../../assets/nav-icons/fire.png" alt="">&nbsp;STRENGHT</span>
                                <p>+{{item.stat2Value}}</p>
                            </div>
                            <div class="col-lg-3 powers"  v-if="item.stat3Element != ''">
                                <span><img width='12' src="../../assets/nav-icons/water.png" alt="">&nbsp;INTELLIGENCE</span>
                                <p>+{{item.stat3Value}}</p>
                            </div>
                            <!-- <div class="col-lg-3 powers">
                                <span><img width='12' src="../assets/nav-icons/fire.png" alt="">&nbsp;STRENGHT</span>
                                <p>+258</p>
                            </div> -->
                            </div>
                        </div>
                        <!-- <div class="col-lg-12">
                            <div class="w-100 d-flex buttones">
                                <div class="cstm-btn active-btn p-2 mr-2 d-flex justify-content-between">
                                    <svg class="icon-secure" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M11.488 21.754c.294.157.663.156.957-.001c8.012-4.304 8.581-12.713 8.574-15.104a.988.988 0 0 0-.596-.903l-8.05-3.566a1.005 1.005 0 0 0-.813.001L3.566 5.747a.99.99 0 0 0-.592.892c-.034 2.379.445 10.806 8.514 15.115zM8.674 10.293l2.293 2.293l4.293-4.293l1.414 1.414l-5.707 5.707l-3.707-3.707l1.414-1.414z" fill="#1168D0"/></svg>
                                    Fixed Price
                                    <p></p>
                                </div>
                                <div class="space">
                                    ....
                                </div>
                                <div class="cstm-btn p-2 ml-2">
                                    Auction (Coming Soon)
                                </div>
                            </div>
                            <div class="w-100 inst">
                            <p>Your asset will be listed on the Marketplace with a fixed price. If you wish to unlist it, you’ll have to cancel the sale and pay a fee.</p>
                            </div>
                            <div class="w-100 sell pt-2">
                                <input type="number" class="cost" value="2.5">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M18.52 30a3 3 0 0 1-2.12-.88L2.88 15.61A3 3 0 0 1 2 13.49V5a3 3 0 0 1 3-3h8.49a3 3 0 0 1 2.12.88l13.51 13.51a3 3 0 0 1 0 4.25l-8.48 8.48a3 3 0 0 1-2.12.88zM5 4a1 1 0 0 0-1 1v8.49a1 1 0 0 0 .3.71l13.51 13.51a1 1 0 0 0 1.41 0l8.49-8.49a1 1 0 0 0 0-1.41L14.2 4.3a1 1 0 0 0-.71-.3H5z" fill="currentColor"/><path d="M10 14a4 4 0 1 1 4-4a4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2z" fill="currentColor"/></svg>
                                    &nbsp;Sell
                                </button>
                            </div>
                            <div class="w-100 inst">
                            <p>You will receive <span>{{item.price}} SKILL</span> because of the 10% transaction fee.</p>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
            </div>
        </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getWeaponNameFromSeed } from '../../weapon-names';
import { getWeaponArt } from '../../weapon-arts-placeholder'
import { mapGetters } from 'vuex';

export default Vue.extend({
    name: 'ItemModal',
    props: ['item'],
    computed: {
        ...mapGetters(
            [
                'getWeaponDurability'
            ]
        )
    },
    methods:{
        getWeaponArt,
        getWeaponNameFromSeed,
        closeModal(modal:string,data:any){
            this.$root.$emit('modal', {modalName:modal,modalData:data})
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
    mounted(){
        console.log(this.$props.item)
    }
});

</script>

<style scoped>

</style>
