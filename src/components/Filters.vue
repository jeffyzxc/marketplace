<template>
    <div>
        <div class="d-flex flex-column">
            <div class="d-flex justify-content-between justify-content-center filters plr">
                <div  v-for="data in elements" :key="data.id" :class="'element-'+data.el+' element-filter__toggle element iconify '+getElement(data.isToggled, data.el)" :id="data.id" v-on:click="setElement(data.el)"></div>
            </div>
        </div>
        <div class="d-flex flex-column filters">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 mbl-50">
                    <label for="form" style="color: #fff !important;">Rarity</label>
                    <div class="form-check" id="form" v-for="(item, index) in itemList" :key="index" >
                        <input class="form-check-input" type="checkbox" :id="item.name+'-checkbox__input'">
                        <label class="form-check-label" :for="item.name+'-checkbox__input'">{{ item.name }}</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 pt-3">
                    <label for="form" style="color: #fff !important;font-size: 11px !important;">Reforge</label> <br>
                    <input type="range" min="1" max="100" value="50" class="slider" id="myRange" style="width: 100% !important;">
                </div>
            </div>
            <div class="row pb-5">
                <div class="col-lg-12 d-flex justify-content-between pt-4">
                    <div class="cstm-btn-active csr-pointer mr-2" v-on:click="clickedFilter('f')" :style="setActive('f','bottomBtn')">FILTER</div>
                    <div style="color:#08142b">...</div>
                    <div class="cstm-btn csr-pointer" v-on:click="clickedFilter('c')" :style="setActive('c','bottomBtn')">CLEAR FILTER</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { EARTH_WEAPON_ELEMENT_NAME, EARTH_WEAPON_ELEMENT_VALUE } from '@/default/element.default';
import { store } from '@/store';
import { 
    marketFilterToQueryDict, 
    queryParamsToMarketFilter 
} from '@/utils/route.utils';
import Vue from 'vue';
import { 
    ItemRarityList 
} from "./../default/rarity.default";

import { 
  IFilterList,
  IMarketFilter 
} from "./../interface/filters.interface";

export const ELEMENT_FILTER_TOGGLE_CLASSNAME = "element-filter__toggle";
export const ELEMENT_CLASSNAME = "element-";
export const CHECKBOX_INPUT_CLASSNAME = "-checkbox__input";

//@TODO add interface for this
export default Vue.extend({
    name: 'MarketFilter',
    store : store,
    data: function(){
        return{
            activeUppderMidTab: "w",
            activeBottomTab: 'f',
            elements:[
                {
                    id: 1,
                    el: 'earth',
                    isToggled: false
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
            itemList: ItemRarityList,
            filter: {
                elementFilter: [],
                rarityFilter: [],
                minPrice: 0,
                maxPrice: Number.MAX_SAFE_INTEGER,
            },
            className: {
                elementFilter: ELEMENT_FILTER_TOGGLE_CLASSNAME,
                checkboxInput: CHECKBOX_INPUT_CLASSNAME
            }
        }
    },
    mounted() {
        const snapshotQuery = this.$route.query;

        if(snapshotQuery) {
            const filterValue: IMarketFilter = queryParamsToMarketFilter(snapshotQuery, this.filter);
            this.filter = filterValue as any;
        }

        this.toggleAllCheckedRarityFilter();
        this.toggleAllCheckedElementFilter();
    },
    destroyed() {
        this.$router.replace({name: "Buy", query: {}});
    },
    methods:{
        clickedFilter(x:string){
            if(x=='f') {
                const filterValue: IMarketFilter = {
                    elementFilter: this.getElementFilterValue(),
                    rarityFilter: this.getRarityFilterValue(),
                    minPrice: 0,
                    maxPrice: Number.MAX_SAFE_INTEGER,
                };
                
                this.filter = filterValue as any;

                this.$router.replace({name: "Buy", query: marketFilterToQueryDict(filterValue)});

                this.$root.$emit('filter-value', filterValue, true);
                this.$root.$emit('toggle', false)
            }
            this.activeBottomTab=x;
        },
        setActive(tab:string,types:string){
            if(types=='upperMidBtn'){
                if(tab==this.activeUppderMidTab){
                    return 'border-bottom: 3px solid #1168d0 !important;'
                }else{
                    return 'border-bottom: 3px solid #08142b !important;'
                }
            }else if(types=='bottomBtn'){
                if(tab==this.activeBottomTab){
                    return 'background-color: #1168d0;color: #fff;'
                }else{
                    return 'background-color: #08142b; color: #fff; border: 1px solid rgba(255, 255, 255, 0.357);'
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
        },
        getElementFilterValue() : IFilterList<string> {
            const elementFilterList: IFilterList<string> = [];

            for (let index = 0; index < this.elements.length; index++) {
                const element = this.elements[index];
                const el = document.querySelector(`.${ELEMENT_CLASSNAME}${element.el}.${this.className.elementFilter}`);        

                if(!el?.classList.contains(`${element.el}-off`)) {
                    elementFilterList.push(
                        {
                            name: element.el,
                            value: element.el
                        }
                    );
                }
            }

            return elementFilterList;
        },
        getRarityFilterValue() : IFilterList<number> {
            const elementRarityList: IFilterList<number> = [];
                
            for (let index = 0; index < this.itemList.length; index++) {
                const arrElement = this.itemList[index];
                const el:HTMLInputElement = document.querySelector(`#${arrElement.name}${this.className.checkboxInput}`) as HTMLInputElement;

                if(el.checked) {
                    elementRarityList.push(
                        {
                            name: arrElement.name,
                            value: arrElement.value
                        }
                    )
                }
            }

            return elementRarityList;
        },
        updateFilter(filter: IMarketFilter) {
            this.filter = filter as any;
        },
        toggleAllCheckedRarityFilter() {
            for (let i = 0; i < (this.filter as IMarketFilter).rarityFilter.length; i++) {
                const filter = (this.filter as IMarketFilter).rarityFilter[i];

                this.toggleWeaponRarityChecbox(`#${filter.name}${CHECKBOX_INPUT_CLASSNAME}`, true);
            }
        },
        toggleAllCheckedElementFilter() {
            for (let i = 0; i < this.filter.elementFilter.length; i++) {
                const filter = this.filter.elementFilter[i] as any;

                this.toggleWeaponElementChecbox(`.${ELEMENT_CLASSNAME}${filter.value.toLowerCase()}.${ELEMENT_FILTER_TOGGLE_CLASSNAME}`, filter.value.toLowerCase(), true);
            }
        },
        toggleWeaponRarityChecbox(selector:string,isToggled: boolean) {
            const el: HTMLInputElement = document.querySelector(selector) as HTMLInputElement;

            el.checked = isToggled;
        },
        toggleWeaponElementChecbox(selector:string, element:string, isToggled: boolean) {
            const el: HTMLInputElement = document.querySelector(selector) as HTMLInputElement;

            let weaponElement = this.elements.find(x => x.el === element);

            if(!weaponElement) return;

            if(isToggled) {
                el.classList.remove(`${element}-off`);

                el.classList.add(`${element}`);

                weaponElement!.isToggled = true;
            } else {
                el.classList.remove(`${element}`);
                el.classList.add(`${element}-off`);

                weaponElement!.isToggled = false;
            }
            
            el.checked = isToggled;
        },
        resetFilterValue() {
            this.filter = {
                elementFilter: [
                ],
                rarityFilter: [],
                minPrice: 0,
                maxPrice: Number.MAX_SAFE_INTEGER,
            };
        }
    }
});

</script>

<style scoped>
    .rl{
        overflow-y: auto !important;
    }
</style>