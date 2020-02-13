<template>
  <div id="app">
    <HeaderNav></HeaderNav>
    <div class="container-fluid">
      <MainCard></MainCard>
    </div>
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav'
import MainCard from './components/MainCard'

export default {
  name: 'app',
  components: {
    HeaderNav,
    MainCard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
}
</style>
