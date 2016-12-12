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
    /*background: rgba(255,255,255,.6) url('http://lorempixel.com/1024/768/nightlife/') no-repeat center center;
    background-size:100% 100%;*/
  }
</style>

<template>
  <div class="tools-card" :style="'background:' + bgimg" v-md-theme="'default'">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'src/vuex/store'
  import getBingImg from './utils/bing'

  export default {
    store,
    data(){
      return {
        bgimg: ''
      }
    },
    mounted(){
      var vm = this, isStr, df = 'http://s.cn.bing.net/az/hprichbg/rb/AidlingerHoehe_ZH-CN11764360351_1024x768.jpg';
      getBingImg('1024x768', (url) => {
        isStr = typeof url === 'string'
        console.log('Get Bing Url Is:' +  url);
        document.getElementsByTagName('body')[0].style.backgroundImage =  "url("+ (isStr ? url : df)+")"
      })
    }
  }
</script>
