<style>
  .host-area{
    display: flex;
    max-height: 730px;
  }
  .host-sidebar{
    flex: none!important;
    -webkit-box-flex: 0!important;
    width: 33.3333%!important;
  }
  .host-editor{
    flex:1;
    padding: 30px;
    text-align: left;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0.9);
  }
</style>
<template>
    <div class="host-area">
      <HostMng class="host-sidebar"/>
      <HostEdit class="host-editor" height="730px"/>
    </div>
</template>

<script>
import HostMng from './HostView/HostMng'
import HostEdit from './HostView/HostEdit'
export default {
  components: {
    HostMng, HostEdit
  },
  data(){
    return {

      }
  },
  methods:{

  }
}
</script>
