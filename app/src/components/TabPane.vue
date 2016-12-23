<template>
  <div class="">
    <Breadcrumb/>
    <md-tabs>
      <md-tab :md-label="tool.name"  :md-icon="tool.icon" v-for="(tool, toolname) in openTools">
        <keep-alive>
         <div v-if="tool" :is="tool.component" keep-alive>{{tool}}</div>
       </keep-alive>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Bus from '../utils/bus'
  import Host from './Host'
  import Format from './Format'
  import Breadcrumb from './NavView/Breadcrumb'

  const _ = require('lodash')
  const tools = [{
      name: 'host工具',
      icon: 'ondemand_video',
      component: Host,
      path: 'host'
    },{
      name: 'code格式化',
      icon: 'ondemand_video',
      component: Format,
      path: 'format'
    }]
  export default {
    components: {
      Host, Breadcrumb
    },
    data(){
      return { openTools: [] }
    },
    created(){
      var path = this.$route.params.id
      if(!~_.map(this.openTools, 'path').indexOf(path)){
        this.openTools.push(_.find(tools, { 'path': path }))
      }
      /*Bus.$on('TABPLUS', pathname => { })*/
    }/*,
    methods:{
      toggleSidenav() {
        this.$refs.sidebar.toggle();
      }
    }*/
  }
</script>
