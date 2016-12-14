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
      <md-dialog-alert class="host-help" :md-title="dialogTitle"
        :md-content-html="dialogContent"
        @open="onOpen"
        @close="onClose"
        ref="dialog">
      </md-dialog-alert>
    </div>
</template>

<script>
import doHost from '../utils/host'
import HostMng from './HostView/HostMng'
import HostEdit from './HostView/HostEdit'
const titlewiki = 'host file wiki'
const hostwiki = `
<div class="host-tips">
<h5>1.row comments </h5>
<hr><pre>#127.0.0.1 localhost #注释</pre><hr>

<h5>2. Host Group comments </h5>
<hr><pre>#==== HOST Group Name
127.0.0.1 localhost
127.0.0.2 test.com
#==== </pre><hr>

<h5>3. host block do not manage </h5>
<hr><pre>#==== HIDE_ALL_OF_INNER
127.0.0.3 test3.com
127.0.0.4 test4.com
#====</pre><hr></div>
<div class="key-tips">
  <h5> editor keymap see: <a href="https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts">https://ace.c9.io/</a></h5>
</div>`

export default {
  components: {
    HostMng, HostEdit
  },
  data(){
    return {
      content: '',
      hosts: [],
      originlines: [],
      heightEditScroll: '',
      heightSideScroll: '',
      dialogTitle: titlewiki,
      dialogContent: hostwiki
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
      var vm = this
      var hostData = doHost.get(true, true, ({lines, texts, originLines}) => {
        if(lines.code){
          vm.openDialog('dialog', 'File Not Find', lines.message)
          return;
        }
        vm.content = texts //edit show
        vm.hosts = lines   //mng show
        vm.originlines = originLines //mng for write
      })

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
    },
    openDialog(ref, title, content) {
      this.dialogTitle = title || titlewiki
      this.dialogContent = content || hostwiki
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      // console.log('Opened');
    },
    onClose(type) {
      // console.log('Closed', type);
    }
  }
}
</script>
