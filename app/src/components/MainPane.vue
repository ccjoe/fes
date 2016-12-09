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
    <VTitle/>
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
  </div>
</template>

<script>
import VTitle from './LandingPageView'
export default {
  components: {
    VTitle,
  },
  data () {
    return {
      tools: [{
          name: 'Host工具',
          desc: 'host管理工具',
          link: 'host',
          img: require('./assets/card-sky.jpg')
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
          img: require('./assets/card-sky.jpg')
      }, {
          name: '格式化',
          desc: 'html, css, js格式化',
          link: 'format',
          sub: {
            CODE:{},
            JSON:{},
            XML:{}
          },
          img: require('./assets/card-sky.jpg')
      }, {
          name: '代码压缩',
          desc: 'html, css, js代码压缩',
          link: 'uglify',
          sub: {
            html:{},
            css:{},
            js:{}
          },
          img: require('./assets/card-sky.jpg')
      }, {
          name: '语法检查',
          desc: 'html, css, js语法检查',
          link: 'hint',
          sub:{
            html:{},
            css:{},
            js:{}
          },
          img: require('./assets/card-sky.jpg')
      }, {
          name: '二维码工具',
          desc: '二维码生成器',
          link: 'qrcode',
          img: require('./assets/card-sky.jpg')
      }, {
          name: '系统/页面取色工具',
          desc: '对系统和页面取色',
          link: 'color',
          img: require('./assets/card-sky.jpg')
      }, {
          name: 'MarkDown',
          desc: 'MarkDown的编辑和预览',
          link: 'md',
          img: require('./assets/card-sky.jpg')
      }]
      }
  },
  methods:{
    toTools(pathname){
      console.log(this.$route, this.$router, this.$router.go, pathname, 'pathname')
      this.$router.push(pathname)
    }
  },
  name: 'landing-page'
}
</script>
