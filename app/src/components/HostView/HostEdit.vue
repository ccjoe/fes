<style lang="scss">
  .host-editor-wrapper{
    padding: 0;
  }
  .md-save-host,  .md-help-host{
    z-index: 10; top:20px!important;
  }
  .md-save-host{
    right: 30px!important;
  }
  .md-help-host{
    right: 90px!important;
  }
  .host-help{
    text-align: left;
    h5{
      margin-top: 10px;
    }
    pre{
      background-color: #fafafa;
    }
  }

</style>
<template>
  <div class="host-editor-wrapper">
    <md-button  @click="saveHost" class="has-ripple md-fab md-raised md-warn md-fab-top-right md-save-host">
      <md-tooltip md-direction="left">保存Editor(Ctrl/Command+S),Sidebar Change Auto Save</md-tooltip>
      <md-icon>save</md-icon>
    </md-button>

    <md-button  @click="$parent.openDialog('dialog')" class="md-mini has-ripple md-fab md-raised md-fab-top-right md-help-host">
      <md-tooltip md-direction="left">HELP(帮助信息)</md-tooltip>
      <md-icon>help</md-icon>
    </md-button>
    <aceEditor ref="aceor" :content.sync="content" :onsave="saveHost"
              :height="height" :width="width" :sync="true"/>
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

    }
  },
  methods:{
    saveHost(){
      var success = doHost.saveHost(this.$refs.aceor.editor.getValue())
      if(success){
        this.$parent.updateFile()
        this.$parent.openDialog('dialog', 'success', '保存成功！')
      }
    }
  }
}
</script>
