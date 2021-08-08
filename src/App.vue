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
        </b-col>
      </b-row>
    </b-container>
    <router-view class="switch-view-container"/>
  </div>
</template>

<style scoped>
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
}

.active-navlink {
  color : rgb(255, 255, 255);
}
</style>
