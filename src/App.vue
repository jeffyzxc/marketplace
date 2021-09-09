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


    <div class="modal-details" v-if="isModal">
        <div class="modal-contianer">
            <svg class='close' @click="closeModal" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="2.4em" height="2.4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12z" fill="#43506A"/><path d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z" fill="#FFFFFF"/></svg>
          <div class="row">
              <div class="col-lg-5">
                  <img width='100%' class='image-fluid' src="./assets/weapons/weapon5.png" alt="">
              </div>
              <div class="col-lg-7">
                  <div class="row">
                      <div class="col-lg-12 rarities">
                          <img width='30' src="./assets/nav-icons/fire.png" alt="">
                          <span>Legendary</span>
                      </div>
                      <div class="col-lg-12 titles">
                          <h4>MALIGNANT SWIFTBLADE</h4>
                          <div class="d-flex">
                            <p class="r">Battles Power: 11,302</p>
                            <p class="l">Reforge Bonus: 2,500</p>
                          </div>
                      </div>
                      <div class="col-lg-12">
                         <div class="progress-bar p-0 m-0">
                            <div><div class="progress" style="width: 70% !important;"></div></div>
                        </div>
                      </div>
                      <div class="col-lg-12 pt-2">
                        <div class="row">
                          <div class="col-lg-3 powers">
                            <span><img width='12' src="./assets/nav-icons/lightning.png" alt="">&nbsp;POWER</span>
                            <p>+311</p>
                          </div>
                          <div class="col-lg-3 powers">
                            <span><img width='12' src="./assets/nav-icons/fire.png" alt="">&nbsp;STRENGHT</span>
                            <p>+150</p>
                          </div>
                          <div class="col-lg-3 powers">
                            <span><img width='12' src="./assets/nav-icons/water.png" alt="">&nbsp;INTELLIGENCE</span>
                            <p>+678</p>
                          </div>
                          <div class="col-lg-3 powers">
                            <span><img width='12' src="./assets/nav-icons/fire.png" alt="">&nbsp;STRENGHT</span>
                            <p>+258</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="w-100 d-flex buttones">
                          <div class="cstm-btn active-btn p-2 mr-2">
                              <svg style="position:relative;float:left;left:0 !important" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M11.488 21.754c.294.157.663.156.957-.001c8.012-4.304 8.581-12.713 8.574-15.104a.988.988 0 0 0-.596-.903l-8.05-3.566a1.005 1.005 0 0 0-.813.001L3.566 5.747a.99.99 0 0 0-.592.892c-.034 2.379.445 10.806 8.514 15.115zM8.674 10.293l2.293 2.293l4.293-4.293l1.414 1.414l-5.707 5.707l-3.707-3.707l1.414-1.414z" fill="#1168D0"/></svg>
                              Fixed Price
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
                          <input type="text" class="cost" value="2.5">
                          <button>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M18.52 30a3 3 0 0 1-2.12-.88L2.88 15.61A3 3 0 0 1 2 13.49V5a3 3 0 0 1 3-3h8.49a3 3 0 0 1 2.12.88l13.51 13.51a3 3 0 0 1 0 4.25l-8.48 8.48a3 3 0 0 1-2.12.88zM5 4a1 1 0 0 0-1 1v8.49a1 1 0 0 0 .3.71l13.51 13.51a1 1 0 0 0 1.41 0l8.49-8.49a1 1 0 0 0 0-1.41L14.2 4.3a1 1 0 0 0-.71-.3H5z" fill="currentColor"/><path d="M10 14a4 4 0 1 1 4-4a4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2z" fill="currentColor"/></svg>
                            &nbsp;Sell
                          </button>
                        </div>
                        <div class="w-100 inst">
                           <p>You will receive <span>2.25 SKILL</span> because of the 10% transaction fee.</p>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
    <router-view class="switch-view-container"/>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import WalletBalance from './components/WalletBalance.vue';
  export default Vue.extend({
      components: { WalletBalance },
      name: 'SortFilter',
      data: function(){
        return{
          menuIsToggled: false,
          isSearch: false,
          isModal: false
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
        this.$root.$on('modal', (data:boolean) => {
            this.isModal = data
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
          this.isModal = false
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
