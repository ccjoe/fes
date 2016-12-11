<style>
  .host-area, .host-editor{
    display: flex;
  }
  .host-sidebar{
    flex: none;
    -webkit-box-flex: 0;
    width: 30%;
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
    
      <HostMng class="host-sidebar" :height="heightSideScroll" :hostdata.sync="hosts" :originlines="originlines" ref="side"/>
      <HostEdit class="host-editor" :height="heightEditScroll" :content.sync="content" ref="editor"/>
    </div>
</template>

<script>
import doHost from '../utils/host'
import HostMng from './HostView/HostMng'
import HostEdit from './HostView/HostEdit'
export default {
  components: {
    HostMng, HostEdit
  },
  data(){
    return {
      content: '',
      hosts: [],
      heightEditScroll: '',
      heightSideScroll: ''
    }
  },
  mounted: function () {
    this.setHeight();
    window.addEventListener('resize', this.setHeight)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.setHeight)
  },

  created(){
    this.updateFile();
  },
  methods:{
    updateFile(){
      var hostData = doHost.get(true, true)
      this.content = hostData.texts //edit show
      this.hosts = hostData.lines   //mng show
      this.originlines = hostData.originLines //mng for write
      // console.log(this.hosts)
    },
    setHeight(){
      var tabContentHeight = document.documentElement.clientHeight - 88;
      this.heightEditScroll = (tabContentHeight - 20) + 'px'
      this.heightSideScroll = (tabContentHeight - 20 - 64) + 'px'
      /*var $target = document.getElementsByClassName('ace_content');
      if($target && $target.length){
        setTimeout(()=> {$target[0].style.height = tabContentHeight + 'px'}, 200)
        console.log($target, tabContentHeight)
      }*/
    }
  }
}
</script>
