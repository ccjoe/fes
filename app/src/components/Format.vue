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
            <md-menu-item @click="changeLang(ilang)" v-for="ilang in ['json', 'xml', 'javascript', 'css', 'html', 'java', 'markdown']">{{ilang}}</md-menu-item>
          </md-menu-content>
        </md-menu>
        <md-menu>
          <md-button md-menu-trigger>theme</md-button>
          <md-menu-content>
            <md-menu-item @click="changeTheme(itheme)" v-for="itheme in ['github', 'monokai', 'cobalt', 'solarized_light']">{{itheme}}</md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-toolbar>
      <aceEditor class="host-editor" ref="editor" :content.sync="content" :theme="theme" :lang="lang" :height="height" :sync="true"/>
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
        content: 'Enter your code here',
        theme: 'monokai',
        height: ''
      }
    },
    mounted(){
      setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
    }
    /*,
    methods:{
      changeLang(selected){
        require('brace/mode/'+selected);
        this.lang = selected
      },
      changeTheme(selected){
          require('brace/theme/'+selected);
          this.theme = selected
      }
    }*/
  }
</script>
