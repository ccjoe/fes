<style lang="scss">
  .editor-format{
    .md-toolbar{
      background-color: rgba(0, 0, 0, 0.8)!important;
      color: #fff!important;
    }
  }
  .md-toolbar .md-title{
    text-align: left;
  }
</style>

<template>
  <div class="editor-format">
      <md-toolbar md-theme="blue">
        <md-button class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>
        <h2 class="md-title" style="flex: 1">Code-Format</h2>
        <md-menu>
          <md-button md-menu-trigger>lang</md-button>
          <md-menu-content>
            <md-menu-item @click="switchLang(ilang)" v-for="ilang in ['json', 'xml', 'javascript', 'css', 'html', 'java', 'markdown', 'sql']">{{ilang}}</md-menu-item>
          </md-menu-content>
        </md-menu>
        <md-menu>
          <md-button md-menu-trigger>theme</md-button>
          <md-menu-content>
            <md-menu-item @click="changeTheme(itheme)" v-for="itheme in ['github', 'monokai', 'cobalt', 'solarized_light']">{{itheme}}</md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-toolbar>
      <aceEditor class="host-editor" ref="editor" :content="content" :theme="theme" :lang="lang" :height="height" :sync="true"/>
  </div>
</template>

<script>
  //选择主题, 选择语言, 格式化
  import aceEditor from './Ace'
  import mixin from '../utils/mixin'
  require('brace/mode/json');

  export default {
    name: 'Format',
    components: {
      aceEditor
    },
    mixins: [mixin],
    data(){
      return {
        lang: 'json',
        content: 'Enter your code here, 点击lang查看支持的语言',
        theme: 'monokai',
        height: ''
      }
    },
    mounted(){
      setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
      this.$on('editor-update', function(val) {
        this.content = val;
      }.bind(this));
    },
    methods:{
      switchLang(selected, min){
        /*
         * all ['json', 'xml', 'css', 'sql', || 'javascript', 'html', 'java', 'markdown']
         * pd Supported ['xml', 'json', 'css', 'sql']
         * pd Example
          var bd = require('pretty-data').bd;
          var xml_pp = bd.xml(data);
          var xml_min = bd.xmlmin(data [,true]);
          var json_pp = bd.json(data);
          var json_min = bd.jsonmin(data);
          var css_pp = bd.css(data);
          var css_min = bd.cssmin(data [, true]);
          var sql_pp = bd.sql(data);
          var sql_min = bd.sqlmin(data);
        */
        var formatText = '';
        if(~['xml', 'json', 'css', 'sql'].indexOf(selected)){
          var bd = require('../utils/beautify/beautify-data.js').pd
          try{
            formatText = bd[selected + (min?'min':'')](this.content)
          }catch(e){
            formatText = this.content;
            alert(JSON.stringify(e))
            return;
          }
        }else if(selected === 'javascript'){
          var jsBeautify = require('../utils/beautify/beautify').js_beautify;
          console.log(jsBeautify, 'jsBeautify')
          formatText = jsBeautify(this.content, {
            'indent_size': 1,
            'indent_char': '\t'
          })
        }else if(selected === 'html'){
          var htmlBeautify = require('../utils/beautify/beautify-html').html_beautify;
          formatText = htmlBeautify(this.content, {
            'indent_size': 2,
            'indent_char': ' ',
            'max_char': 78,
            'brace_style': 'expand',
            'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u']
          });
        }else{
          formatText = this.content;
        }
        this.content = formatText;
        this.changeLang(selected);
      }
    }
  }
</script>
