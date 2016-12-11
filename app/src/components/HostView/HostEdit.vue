<style lang="scss">
  .host-editor-wrapper{
    padding: 0;
  }
  .md-save-host,  .md-help-host{
    z-index: 10; top:20px!important;
  }
  .md-save-host{
    right: 20px!important;
  }  
  .md-help-host{
    right: 85px!important;
  }
  .host-help{
    text-align: left;
    pre{
      background-color: #fafafa;
    }
  }
  
</style>
<template>
  <div class="host-editor-wrapper">
    <md-button  @click="saveHost" class="has-ripple md-fab md-raised md-warn md-fab-top-right md-save-host">
      <md-ink-ripple></md-ink-ripple>
      <md-icon>save</md-icon>
    </md-button>

    <md-button  @click="openDialog('hostwiki')" class="md-mini has-ripple md-fab md-raised md-fab-top-right md-help-host">
      <md-ink-ripple></md-ink-ripple>
      <md-icon>help</md-icon>
    </md-button>
    <aceEditor ref="aceor" :content.sync="content" :onsave="saveHost"
              :height="height" :width="width" :sync="true"/>

    <md-dialog-alert class="host-help" md-title="host file wiki"
      :md-content-html="hostWikiContent"
      @open="onOpen"
      @close="onClose"
      ref="hostwiki">
    </md-dialog-alert>
  </div>
</template>

<script>
import doHost from '../../utils/host'
import aceEditor from '../AceHostVue/ace'
export default {
  components: {
      aceEditor
  },
  props:{
    content:{
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data(){
    return {
      hostWikiContent: `<h5>1.row comments </h5>
<hr><pre>#127.0.0.1 localhost #注释</pre><hr>

<h5>2. Host Group comments </h5>
<hr><pre>#==== 
127.0.0.1 localhost 
127.0.0.2 test.com 
====# </pre><hr>

<h5>3. host block do not manage </h5>
<hr><pre>#==== HIDE-ALL-OF-INNER 
127.0.0.3 test3.com 
127.0.0.4 test4.com 
#====</pre><hr>`
    }
  },
  methods:{
    saveHost(){
      var success = doHost.saveHost(this.$refs.aceor.editor.getValue())
      if(success){
        this.$parent.updateFile()
      }
      alert('successs, 保存成功！')
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
    }
  }
}
</script>
