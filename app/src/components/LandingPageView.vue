<style scoped>
  img {
    width: 450px;
  }
  .hd-title{
    width: 100%;
  }
</style>

<template>
  <div class="hd-title">
    <img src="./LandingPageView/assets/logo.png" alt="electron-vue">
    <h1>FrontEnd Tools</h1>
  </div>
</template>

<script>
  import CurrentPage from './LandingPageView/CurrentPage'
  import Links from './LandingPageView/Links'
  import Versions from './LandingPageView/Versions'

  export default {
    components: {
      CurrentPage,
      Links,
      Versions
    },
    name: 'landing-page'
  }
</script>
