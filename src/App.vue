<template>
  <div class="app">
    <b-container class="bv-example-row" fluid>
      <b-row class="navbar-cb-logo">
        <b-col cols="2" class="logo-title"><img src='./assets/logo_Text_Source@2x.png'/></b-col>
        <b-col cols="10" class="nav-top">
          <div class="nav">
            <router-link to="/" class="navlinks" active-class="active-navlink">Buy</router-link>
            <router-link to="/sell"  class="navlinks" active-class="active-navlink">Sell</router-link>
            <router-link to="/listings"  class="navlinks" active-class="active-navlink">My listings</router-link>
            <router-link to="/history"  class="navlinks" active-class="active-navlink">Transaction History</router-link>
          </div>
          <div class="wallet-details">
            <div class="skill-wallet">
              <img src="./assets/addButton.png" alt="" srcset="" class="add-wallet-icon">
              <span>Buy Skill</span>
            </div>
            <div class="skill-wallet">
              <img src="./assets/skillicon.png" alt="" srcset="" class="add-wallet-icon">
              <span>50.299</span>
            </div>
            <div class="bnb-wallet">
              <img src="./assets/binance-coin-logo@2x.png" alt="" srcset="" class="add-wallet-icon">
              <span>10.299</span>
            </div>

            <div class="wallet-address">
              <span>0x2B…61cB</span>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <router-view class="switch-view-container"/>
  </div>
</template>

<style>
html, body {
  margin:0px;
  height:100%;
}
</style>
<style scoped>
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
  border: 1px solid rgba(57, 67, 85, 1);
  display: flex;
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
.nav-top > .nav {
  align-items: center;
  justify-self: flex-start;
  flex : 2
}

.active-navlink {
  color : rgb(255, 255, 255);
}

.wallet-details {
  flex : 1;
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
