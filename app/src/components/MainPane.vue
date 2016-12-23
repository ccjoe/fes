<style scoped>
.list-tools{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}
.md-card {
    max-width: 300px;
    min-width: 25%;
    margin: 20px;
    flex: 1;
    font-weight: bold;
    background-color: rgba(0,0,0,.7)!important;
}
.md-card .md-card-actions{flex-wrap: wrap;}
</style>

<template>
  <div class="">
    <VHeader/>
    <section class="list-tools">
      <md-card  md-with-hover v-for="tool in tools" @click.native="toTools(tool.link)">
          <md-card-media-cover md-text-scrim>
              <md-card-media md-ratio="16:9">
                  <!-- <img :src="tool.img" :alt="tool.name"> -->
              </md-card-media>
              <md-card-area>
                  <md-card-header>
                      <div class="md-title">{{tool.name}}</div>
                      <div class="md-subhead">{{tool.desc}}</div>
                  </md-card-header>
                  <md-card-actions>
                      <md-button v-for="(v, k) in tool.sub">{{k}}</md-button>
                  </md-card-actions>
              </md-card-area>
          </md-card-media-cover>
      </md-card>
    </section>
    <CopyRight :bgtext="bgtext"/>
  </div>
</template>

<script>
import VHeader from './VHeader'
import CopyRight from './NavView/CopyRight'
import getBingImg from '../utils/bing'
import Bus from '../utils/bus'

// import Host from './Host'
// import Format from './Format'

const _ = require('lodash')
export default {
  components: {
    VHeader, CopyRight
  },
  data () {
    return {
      bgtext: '曼哈顿海滩码头，加利福尼亚州，美国 (© Mat Rick Photography/Aurora Photos)',
      bgimg: 'http://www.bing.com//az/hprichbg/rb/ManhattanBeach_ZH-CN10916747728_1024x768.jpg',
      selectedTools: {},
      tools: [{
          name: 'Host工具',
          desc: 'host管理工具',
          link: 'host',
          icon: 'ondemand_video',
          // component: Host,
          // img: require('./assets/card-sky.jpg')
        }, {
          name: '格式化',
          desc: 'html, css, js格式化',
          icon: 'ondemand_video',
          // component: Format,
          link: 'format',
          sub: {
            CODE:{},
            JSON:{},
            XML:{}
          },
          // img: require('./assets/card-sky.jpg')
        }, {
          name: '字符编解码',
          desc: '各种字符编解码',
          link: 'string',
          sub: {
            Unicode:{},
            UTF8:{},
            base64:{},
            md5:{},
            html2js:{}
          },
          // img: require('./assets/card-sky.jpg')
        }, {
          name: '代码压缩',
          desc: 'html, css, js代码压缩',
          link: 'uglify',
          sub: {
            html:{},
            css:{},
            js:{}
          },
          // img: require('./assets/card-sky.jpg')
        }, {
          name: '语法检查',
          desc: 'html, css, js语法检查',
          link: 'hint',
          sub:{
            html:{},
            css:{},
            js:{}
          },
          // img: require('./assets/card-sky.jpg')
        }, {
          name: '二维码工具',
          desc: '二维码生成器',
          link: 'qrcode',
          // img: require('./assets/card-sky.jpg')
        }, {
          name: '系统/页面取色工具',
          desc: '对系统和页面取色',
          link: 'color',
          // img: require('./assets/card-sky.jpg')
        }, {
          name: 'MarkDown',
          desc: 'MarkDown的编辑和预览',
          link: 'md',
          // img: require('./assets/card-sky.jpg')
        }]
      }
  },
  created(){
    var vm = this, isStr
    getBingImg('1024x768', (url, text) => {
      isStr = typeof url === 'string'/*, cr = document.getElementsByClassName('fes-copyright')*/
      console.log('Get Bing Url Is:' +  url);
      vm.bgtext =  text
      vm.bgimg =  isStr ? "url("+ url +")" : undefined;
      document.getElementsByTagName('body')[0].style.backgroundImage =  vm.bgimg
    })
  },
  methods:{
    toTools(path){
      // if(!~_.map(this.selectedTools, 'path').indexOf(path)){}
      // this.selectedTools = _.find(this.tools, { 'link': path })
      // Bus.$emit('TABPLUS', this.selectedTools)
      this.$router.push(path)
    }
  },
  name: 'landing-page'
}
</script>
