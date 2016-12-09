<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; overflow: hidden;}

  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
      );
    background-position: center;
    display: flex;
    font-family: Lato, Helvetica, sans-serif;
    justify-content: center;
    text-align: center;
  }
  .tools-card{
    width: 100%;
    height: 100%;
    background: url('./assets/bg.jpg') no-repeat center center;
  }
</style>

<template>
  <div class="tools-card" v-md-theme="'default'">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'src/vuex/store'

  export default {
    store
  }
</script>
