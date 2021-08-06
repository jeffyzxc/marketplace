<template>
  <div class="app">
    <b-container class="bv-example-row" fluid>
      <b-row class="navbar-cb-logo">
        <b-col cols="3" class="logo-title">CryptoBlades</b-col>
        <b-col cols="9" class="nav-top">
          <div class="nav">
            <router-link to="/">Buy</router-link>
            <router-link to="/sell">Sell</router-link>
            <router-link to="/listings">My listings</router-link>
            <router-link to="/history">Transaction History</router-link>
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
  height : 3.5rem;
}

.logo-title, .nav-top {
  border: 1px solid rgba(57, 67, 85, 1);
}
</style>
