<template>
  <div class="app row">
    <div class="col-lg-2 col-md-2 col-sm-12 p-3 d-flex justify-content-center align-items-center bdr-line-bottom">
        <img class="cb-logo" src='./assets/logo_Text_Source@2x.png' alt="">
    </div>
    <!-- HIDDEN MENU USED - SHOWS WHEN IN MOBILE -->
    <transition name="right-fade" mode="out-in">
      <div class="mobile-menu col-lg-12 hidden-desktop-lg" v-if="menuIsToggled">
            <div class="nav-menu" v-if="menuIsToggled">
                <ul class="navbar-nav mr-auto">
                    <li  v-on:click="toggleMenu(false)" class="nav-item active"><a class="nav-link" href="#"><router-link to="/"  class="navlinks" active-class="active-navlink" exact>BUY</router-link></a> </li>
                    <li  v-on:click="toggleMenu(false)" class="nav-item"><a class="nav-link" href="#"><router-link to="/sell"  class="navlinks" active-class="active-navlink">SELL</router-link></a></li>
                    <li  v-on:click="toggleMenu(false)" class="nav-item"> <a class="nav-link" href="#"><router-link to="/listings"  class="navlinks" active-class="active-navlink">MY LISTINGS</router-link></a></li>
                    <li  v-on:click="toggleMenu(false)" class="nav-item"> <a class="nav-link" href="#"><router-link to="/history"  class="navlinks" active-class="active-navlink">TRANSACTION HISTORY</router-link></a></li>
                  </ul>
            </div>
      </div>
    </transition>
         
    <div class="col-lg-10 col-md-10 col-sm-12 pt-3 pb-0 pr-0 bdr-line-left bdr-line-bottom">
        <nav class="navbar navbar-expand-lg navbar-light bg-color pb-0">
            <button v-on:click="toggleMenu(true)" class="navbar-toggler pb-0" type="button" data-toggle="collapse" data-target="#filters" aria-controls="filters" aria-expanded="false" aria-label="Toggle navigation">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g transform="translate(24 0) scale(-1 1)"><g fill="#ffffff"><path d="M20.05 11H5.91l1.3-1.29a1 1 0 0 0-1.42-1.42l-3 3a1 1 0 0 0 0 1.42l3 3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L5.91 13h14.14a1 1 0 0 0 .95-.95V12a1 1 0 0 0-.95-1z"/><rect x="3" y="17" width="18" height="2" rx=".95" ry=".95"/><rect x="3" y="5" width="18" height="2" rx=".95" ry=".95"/></g></g></svg>
            </button>
            <div class="collapse navbar-collapse navs-hover" id="filters">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active"><a class="nav-link" href="#"><router-link to="/"  class="navlinks" active-class="active-navlink" exact>BUY</router-link></a> </li>
                <li class="nav-item"><a class="nav-link" href="#"><router-link to="/sell"  class="navlinks" active-class="active-navlink">SELL</router-link></a></li>
                <li class="nav-item"> <a class="nav-link" href="#"><router-link to="/listings"  class="navlinks" active-class="active-navlink">MY LISTINGS</router-link></a></li>
                <li class="nav-item"> <a class="nav-link" href="#"><router-link to="/history"  class="navlinks" active-class="active-navlink">TRANSACTION HISTORY</router-link></a></li>
              </ul>
            </div>
            <div class="d-flex right-nav align-items-center pb-4">
                <div class="csr-pointer d-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M12 8v4m0 0v4m0-4h4m-4 0H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="10" stroke="#F0E2B6" stroke-width="2"/></g></svg>
                    <span></span>
                    <span class="hidden-mobile-sm">BUY SKILL</span>
                </div>
                <wallet-balance />
            </div>
        </nav>
    </div>
    <router-view class="switch-view-container"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import WalletBalance from './components/WalletBalance.vue'
  export default Vue.extend({
      components: {
        WalletBalance
      },
      name: 'SortFilter',
      data: function(){
        return{
          menuIsToggled: false
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
      methods:{
        toggleMenu(bol:boolean){
            this.menuIsToggled = bol
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
    .cb-logo {
        width: 180px !important;
        height: 25px !important;
    }

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
