<style scoped>

</style>
<template>
  <aceEditor :content="content" :height="height"/>
</template>

<script>
var hostText = `#######################################################################
# 更新于：2015-12-16 10:14
#
# 更新地址：http://www.22ba.com/article/Share481.html
#
#######################################################################

# Gmail web Start
#216.239.38.125 chatenabled.mail.google.com
#216.239.38.125 filetransferenabled.mail.google.com
#216.239.38.125 gmail.com
#216.239.38.125 gmail.google.com
#216.239.38.125 googlemail.l.google.com
#216.239.38.125 inbox.google.com
#216.239.38.125 isolated.mail.google.com
#216.239.38.125 m.gmail.com
#216.239.38.125 m.googlemail.com
#216.239.38.125 mail.google.com
#216.239.38.125 www.gmail.com
# Gmail web End
# Gmail web Start
#216.239.38.125 chatenabled.mail.google.com
#216.239.38.125 filetransferenabled.mail.google.com
#216.239.38.125 gmail.com
#216.239.38.125 gmail.google.com
#216.239.38.125 googlemail.l.google.com
#216.239.38.125 inbox.google.com
#216.239.38.125 isolated.mail.google.com
#216.239.38.125 m.gmail.com
#216.239.38.125 m.googlemail.com
#216.239.38.125 mail.google.com
#216.239.38.125 www.gmail.com
# Gmail web End
# Gmail web Start
#216.239.38.125 chatenabled.mail.google.com
#216.239.38.125 filetransferenabled.mail.google.com
#216.239.38.125 gmail.com
#216.239.38.125 gmail.google.com
#216.239.38.125 googlemail.l.google.com
#216.239.38.125 inbox.google.com
#216.239.38.125 isolated.mail.google.com
#216.239.38.125 m.gmail.com
#216.239.38.125 m.googlemail.com
#216.239.38.125 mail.google.com
#216.239.38.125 www.gmail.com
# Gmail web End`;
import aceEditor from '../ace-vue/ace'
export default {
  components: {
      aceEditor
  },
  props:{
    height: {
      type: String,
      default: '100%'
    }
  },
  data(){
    return {
      content: hostText
    }
  },
  methods:{

  }
}
</script>
