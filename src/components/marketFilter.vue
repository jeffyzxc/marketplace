<template>
    <div class="rl">
        <div class="d-flex flex-column">
            <div class="d-flex switch-btn justify-content-center align-items-center pb-4 pt-4 bdr-line-bottom plr">
                <div class="left-switch-btn sw-active rounded-lefts csr-pointer" v-on:click="activeUpperTab='c'" :style="setActive('c','upperBtn')">CRYPTOBLADES</div>
                <div class="left-switch-btn rounded-rights csr-pointer"  v-on:click="activeUpperTab='o'" :style="setActive('o','upperBtn')">OPEN MARKET</div>
            </div>
            <div class="d-flex flex-column">
                <div class="d-flex switch-btn justify-content-center flex-grow-1 align-items-center pt-4 plr">
                    <div class="left-switch-btn-line line-active csr-pointer" v-on:click="activeUppderMidTab='w'" :style="setActive('w','upperMidBtn')">WEAPONS</div>
                    <div class="left-switch-btn-line csr-pointer" v-on:click="activeUppderMidTab='c'" :style="setActive('c','upperMidBtn')">CHARACTERS</div>
                </div>
                <div class="d-flex justify-content-between justify-content-center filters plr">
                    <div  v-for="data in elements" :key="data.id" :class="'element iconify '+getElement(data.isToggled, data.el)" :id="data.id" v-on:click="setElement(data.el)"></div>
                </div>
            </div>
            <div class="d-flex flex-column filters">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 mbl-50">
                        <label for="form" style="color: #fff !important;">Rarity</label>
                        <div class="form-check" id="form">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">Legendary</label>
                        </div>
                        <div class="form-check" id="form">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">Mythical</label>
                        </div>
                        <div class="form-check" id="form">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">Unique</label>
                        </div>
                        <div class="form-check" id="form">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">Rare</label>
                        </div>
                        <div class="form-check" id="form">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">Normal</label>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 mbl-50">
                        <label for="form" style="color: #fff !important;">Stat</label>
                        <div class="form-check" id="form">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">Strength</label>
                        </div>
                        <div class="form-check" id="form">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">Dexterity</label>
                        </div>
                        <div class="form-check" id="form">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">Intelligence</label>
                        </div>
                        <div class="form-check" id="form">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">Charisma</label>
                        </div>
                        <div class="form-check" id="form">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">Power</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 pt-3">
                        <label for="form" style="color: #fff !important;font-size: 11px !important;">Reforge</label> <br>
                        <input type="range" min="1" max="100" value="50" class="slider" id="myRange" style="width: 100% !important;">
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 d-flex justify-content-between pt-4">
                        <div class="cstm-btn-active csr-pointer mr-2" v-on:click="clickedFilter('f')" :style="setActive('f','bottomBtn')">FILTER</div>
                        <div style="color:#08142b">...</div>
                        <div class="cstm-btn csr-pointer" v-on:click="clickedFilter('c')" :style="setActive('c','bottomBtn')">CLEAR FILTER</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'MarketFilter',
    data: function(){
        return{
            activeUpperTab: "c",
            activeUppderMidTab: "w",
            activeBottomTab: 'f',
            elements:[
                {
                    id: 1,
                    el: 'earth',
                    isToggled: true
                },
                {
                    id: 2,
                    el: 'fire',
                    isToggled: false
                },
                {
                    id: 3,
                    el: 'water',
                    isToggled: false
                },
                {
                    id: 4,
                    el: 'lightning',
                    isToggled: false
                }
            ],
        }
    },
    methods:{
        clickedFilter(x:string){
            if(x=='f'){
                this.$root.$emit('set-toggle', false)
            }
            this.activeBottomTab=x
        },
        setActive(tab:string,types:string){
            if(types=='upperBtn'){
                if(tab==this.activeUpperTab){
                    return 'background-color: #1168d0 !important;'
                }else{
                    return 'background-color: #253148 !important;'
                }
            }else if(types=='upperMidBtn'){
                if(tab==this.activeUppderMidTab){
                    return 'border-bottom: 3px solid #1168d0 !important;'
                }else{
                    return 'border-bottom: 3px solid #08142b !important;'
                }
            }else if(types=='bottomBtn'){
                if(tab==this.activeBottomTab){
                    return '  background-color: #1168d0;color: #fff;'
                }else{
                    return ' background-color: #08142b; color: #fff; border: 1px solid rgba(255, 255, 255, 0.357);'
                }
            }
            
        },
        setElement(el:string){
            for(var x in this.elements){
                if(el== this.elements[x].el && this.elements[x].isToggled){
                    this.elements[x].isToggled = false
                }else if(el== this.elements[x].el && !this.elements[x].isToggled ){
                    this.elements[x].isToggled = true
                }
            }
        },
        getElement(stat:boolean,el:string){
            if(stat){
                return el
            }else{
                return el+'-off'
            }
        }
    }
});

</script>

<style scoped>
    .rl{
        overflow-y: auto !important;
    }
</style>
