<style scoped>
  p{
    padding: 0 20px;
  }
  p>*{
    display: block;
    text-align: right;
    color: #eee;
  }
  .md-caption{color: #ccc!important;}
</style>

<template>
  <p class="fes-footer">
    <span class="md-body-1">CopyRight © Joe(icareu.joe@gmail.com)</span>
    <span class="md-caption">© 图片来源于必应搜索 | © 2016 Microsoft</span>
    <span class="md-caption fes-copyright">{{bgtext}}</span>
  </p>
</template>
<script>
export default {
  props:{
    bgtext: {
      type: String,
      default: '陆地卫星8号的红外照片， 摄于哈萨克斯坦的油田 (© NASA)'
    }
  }
}
</script>
