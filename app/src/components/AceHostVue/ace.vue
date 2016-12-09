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
require('./ace-host.js');
require('brace/theme/monokai');

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
    editor.on('change', function () {
      vm.$parent.$emit('editor-update', editor.getValue());
    });
  },

  watch: {
    content: function (newContent) {
      const vm = this;
      if (vm.sync) {
        vm.editor.setValue(newContent, 1);
      }
    },

    theme: function (newTheme) {
      const vm = this;
      vm.editor.setTheme('ace/theme/' + newTheme);
    }
  }
};
</script>
