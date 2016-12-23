<style scoped>
  .ace-fes{
    font-size: 15px;
  }
</style>
<template>
  <div class="ace-fes" :style="{height: height, width: width}"></div>
</template>

<script>
const ace = require('brace');
require('brace/theme/monokai');
require('brace/ext/searchbox')

export default {
  props: {
    content: {
      type: String,
      required: true
    },
    lang: {
      type: String,
      default: 'host'
    },
    theme: {
      type: String,
      default: 'monokai'
    },
    height: {
      type: String,
      default: '800px'
    },
    width: {
      type: String,
      default: '100%'
    },
    sync: {
      type: Boolean,
      default: false
    },
    onsave:{
      type: Function,
      default: function(){}
    }
  },

  data: function () {
    return {
      editor: null,
    };
  },

  mounted: function () {
    const vm = this;
    var lang = vm.lang;
    var theme = vm.theme;
    var editor = vm.editor = ace.edit(vm.$el);
    editor.$blockScrolling = Infinity;
    editor.getSession().setMode('ace/mode/' + lang);
    editor.setTheme('ace/theme/' + theme);
    editor.setValue(vm.content, 1);
    editor.setShowPrintMargin(false);
    editor.on('change', function () {
      vm.$parent.$emit('editor-update', editor.getValue());
    });
    // this.editor.resize(true)
  },

  watch: {
    content: function (newContent) {
      if (this.sync) {
        this.editor.setValue(newContent, 1);
      }
    },
    theme: function (theme) {
      console.log(theme, 'theme')
      var langMode = require('brace/theme/'+theme).Mode;
      // this.editor.setTheme('ace/theme/' + theme); //format none
      this.editor.setTheme(langMode);   //format
    },
    lang: function (lang) {
      require('brace/mode/'+lang);
      this.editor.getSession().setMode('ace/mode/' + lang);
    }
  }
};
</script>
