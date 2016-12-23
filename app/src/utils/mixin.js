//选择主题行为可以mixin
export default {
  mounted: function () {
    this.setHeight();
    window.addEventListener('resize', this.setHeight)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.setHeight)
  },
  methods:{
    setHeight(){
      console.log(this.$options.name)
      var tabContentHeight = document.documentElement.clientHeight - 108;
      var isFormat = this.$options.name === 'Format';
      var gap = isFormat ? 60 : 0;
      if(!isFormat) this.heightSideScroll = (tabContentHeight - 64) + 'px'
      this.height = (tabContentHeight - gap) + 'px'
    },
    changeLang(selected){
      this.lang = selected
    },
    changeTheme(selected){
        this.theme = selected
    }
  }
}
