<template>
  <div class="app row">
    <div class="col-lg-2 top-navs col-md-2 col-sm-6 p-3 d-flex justify-content-center align-items-center bdr-line-bottom">
        <img class="cb-logo" src='./assets/logo_Text_Source@2x.png' alt="">
    </div>
    <!-- HIDDEN MENU - SHOWS WHEN IN MOBILE -->
    <transition name="right-fade" mode="out-in">
      <div class="mobile-menu col-lg-12 hidden-desktop-lg" v-if="menuIsToggled">
            <div class="nav-menu" v-if="menuIsToggled">
                <ul class="navbar-nav mr-auto">
                    <li  v-on:click="toggleMenu(false)" class="nav-item active"><a class="nav-link" href="#"><router-link to="/"  class="navlinks" active-class="active-navlink" exact>BUY</router-link></a> </li>
                    <li  v-on:click="toggleMenu(false)" class="nav-item"><a class="nav-link" href="#"><router-link to="/sell"  class="navlinks" active-class="active-navlink">SELL</router-link></a></li>
                    <li  v-on:click="toggleMenu(false)" class="nav-item"> <a class="nav-link" href="#"><router-link to="/listings"  class="navlinks" active-class="active-navlink">ADVERTISE</router-link></a></li>
                    <!-- <li  v-on:click="toggleMenu(false)" class="nav-item"> <a class="nav-link" href="#"><router-link to="/history"  class="navlinks" active-class="active-navlink">TRANSACTION HISTORY</router-link></a></li> -->
                  </ul>
            </div>
      </div>
    </transition>
         
    <div class="col-lg-10 top-navs col-md-10 col-sm-6 pb-0 pr-0 bdr-line-left bdr-line-bottom">
        <nav :class="isMobile ? 'bg-color pb-0 d-flex':'navbar navbar-expand-lg navbar-light bg-color pb-0 d-flex'">
            <div class="left-nav" v-if="!isMobile">
              <div class="search">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.3em" height="1.3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#8f949e" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"/></svg>
                  <input type="text" class="form-control search-input" placeholder="Search ID, Name, Etc.">
              </div>
            </div>
            <div class="d-flex right-nav align-items-center navbar-expand-lg">
                <div class="collapse navbar-collapse navs-hover pt-3" id="filters">
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item active"><a class="nav-link" href="#"><router-link to="/"  class="navlinks" active-class="active-navlink" exact>BUY</router-link></a> </li>
                      <li class="nav-item"><a class="nav-link" href="#"><router-link to="/sell"  class="navlinks" active-class="active-navlink">SELL</router-link></a></li>
                      <li class="nav-item"> <a class="nav-link" href="#"><router-link to="/listings"  class="navlinks" active-class="active-navlink">ADVERTISE</router-link></a></li>
                      <!-- <li class="nav-item"> <a class="nav-link" href="#"><router-link to="/history"  class="navlinks" active-class="active-navlink">TRANSACTION HISTORY</router-link></a></li> -->
                    </ul>
                </div>
                <wallet-balance />
            </div>
        </nav>
    </div>

    <!-- HIDDEN MENU - SHOWS WHEN IN MOBILE -->
    <div class="col-sm-12 mobile-navigation" v-if="isMobile" :style="isSearch ? 'padding-top:16px': 'padding-top:30px' ">
       <div class="search" v-if="isSearch">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.3em" height="1.3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#8f949e" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"/></svg>
          <input type="text" class="form-control search-input" placeholder="Search ID, Name, Etc.">
          <svg @click="showSearch(false)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42z"/></svg>
      </div>
      <div class="d-flex justify-content-between" v-else>
         <button @click="toggleFilter(true)" class="navbar-toggler pb-0" type="button" data-toggle="collapse" data-target="#filters" aria-controls="filters" aria-expanded="false" aria-label="Toggle navigation">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17z" fill="currentColor"/></g></svg>
          Filter
        </button>
        <button @click="showSearch(true)" class="navbar-toggler pb-0" type="button" data-toggle="collapse" data-target="#filters" aria-controls="filters" aria-expanded="false" aria-label="Toggle navigation">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"/></svg>
          Search
        </button>
        <button  @click="toggleMenu(true)" class="navbar-toggler pb-0" type="button" data-toggle="collapse" data-target="#filters" aria-controls="filters" aria-expanded="false" aria-label="Toggle navigation">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M4 6h16M4 12h8m-8 6h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
          Menu
        </button>
        <div class="navbar-toggler hex-id">
            <span class="primary lighten-5">
             0x28...61cB
            </span>
        </div>
      </div>
    </div>
    <transition name="fadeInUp" mode="out-in">
      <component v-bind:is="modal" :item="modalData"/>
    </transition>
    <router-view class="switch-view-container"/>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import ItemModal from './components/ItemModal.vue'
import WalletBalance from './components/WalletBalance.vue';
  export default Vue.extend({
      components: { WalletBalance, 'item-modal': ItemModal },
      name: 'SortFilter',
      data: function(){
        return{
          menuIsToggled: false,
          isSearch: false,
          modal: "",
          modalData: ""
        }
      },
      computed:{
         isMobile() {
          if( screen.width <= 600) {
            return true;
          }
          else {
            return false;
          }
        }
      },
      mounted(){
        this.$root.$on('modal', (data:any) => {
          this.modal = data.modalName
          this.modalData = data.modalData
            // this.isModal = data
        })
      },
      methods:{
        toggleFilter(bol:boolean){
          this.$root.$emit('toggle', bol)
        },
        toggleMenu(bol:boolean){
            this.menuIsToggled = bol
        },
        showSearch(bol:boolean){
          this.isSearch = bol
        },
        closeModal(){
          this.modal = ""
        }
      }
  });

</script>

<style>
  @import './App.css';
</style>

<style>
html, body {
  margin:0px;
  height:100%;
}

/* Additional Flex Utilities (non-bootstrap existent) */

.flex-grow-1 {
  flex: 1;
}
.flex-grow-2 {
  flex: 2;
}
.flex-grow-3 {
  flex: 3;
}
.flex-grow-4 {
  flex: 4;
}

.justify-self-end {
  justify-self : flex-end;
}
.justify-self-center {
  justify-self : center;
}

.justify-self-start {
  justify-self : flex-start;
}


</style>
<style scoped>
    /* .cb-logo {
        width: 180px !important;
        height: 25px !important;
    } */

.app {
  background-color: rgb(8,20,43);
  height:100%;
}
.switch-view-container {
  height:100%;
}
.navbar-cb-logo {
  background : rgb(8,20,43);
  height : 5.5rem;
}

.logo-title, .nav-top {
  /* border-right: 0px !important; */
  border-right: 1px solid rgba(57, 67, 85, 1);
  border-bottom: 1px solid rgba(57, 67, 85, 1);
}
.logo-title {
  justify-content: center;
  align-items: center;
}
.logo-title > img {
  width: 15rem;
}
.navlinks{
  padding-left: 15px;
  padding-right:15px;
  text-decoration: none;
  color : rgba(255, 255, 255, 0.5);
}

.active-navlink {
  color : rgb(255, 255, 255);
}

.add-wallet-icon {
  height: 1rem;
}

.wallet-address {
  width: 141px;
  height: 38px;
  background: #253148 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  text-align: center;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
}

.skill-wallet > span, .bnb-wallet > span {
  margin-left: 5px;
}

.wallet-details > * {
  color : white;
}



</style>
