<template>
  <aceEditor :content.sync="content" :height="height" :sync="true"/>
</template>

<script>
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
    }
  }
}
</script>
