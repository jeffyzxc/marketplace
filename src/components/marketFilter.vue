<template>
    <div class="rl">
                <div class="d-flex flex-column">
                    <div class="d-flex switch-btn justify-content-center align-items-center pb-4 pt-4 bdr-line-bottom ">
                        <div class="left-switch-btn sw-active rounded-lefts">CRYPTOBLADES</div>
                        <div class="left-switch-btn rounded-rights">OPEN MARKET</div>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="d-flex switch-btn justify-content-center align-items-center pt-4">
                            <div class="left-switch-btn-line line-active csr-pointer">WEAPONS</div>
                            <div class="left-switch-btn-line csr-pointer">CHARACTERS</div>
                        </div>
                        <div class="d-flex justify-content-between justify-content-center filters">
                            <div class="element iconify fire" id="fire">
                                <!-- <img src="Images/nav-icons/fire.png" alt=""> -->
                            </div>
                            <div class="element iconify earth-off" id="earth">
                                <!-- <img src="Images/nav-icons/earth-off.png" alt=""> -->
                            </div>
                            <div class="element iconify lightning-off" id="lightning">
                                <!-- <img src="Images/nav-icons/lightning-off.png" alt=""> -->
                            </div>
                            <div class="element iconify water" id="water">
                                <!-- <img src="Images/nav-icons/fire-off.png" alt=""> -->
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column filters">
                        <div class="row">
                            <div class="col-lg-6">
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
                            <div class="col-lg-6">
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
                                <label for="form" style="color: #fff !important;font-size: 12px !important;">Reforge</label> <br>
                                <input type="range" min="1" max="100" value="50" class="slider" id="myRange" style="width: 100% !important;">
                            </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-12 d-flex justify-content-between pt-5">
                                <div class="cstm-btn-active csr-pointer">FILTER</div>
                                <div class="cstm-btn csr-pointer">CLEAR FILTER</div>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'MarketFilter'
});

</script>

<style scoped>

</style>
