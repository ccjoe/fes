<template>
  <md-tabs>
    <md-tab :md-label="tool.name"  :md-icon="tool.icon" v-for="tool in openTools">
      <Host/>
    </md-tab>
  </md-tabs>
</template>

<script>
import Host from './Host'
export default {
  components: {
    Host,
  },
  data(){
    return {
        openTools: [{
          name: 'host工具',
          icon: 'ondemand_video'
        }/*,{
          name: '字符串编码',
          icon: 'ondemand_video'
        }*/]
      }
  },
  methods:{
    toggleSidenav() {
      this.$refs.sidebar.toggle();
    }
  },
  name: 'nav-page'
}
</script>
