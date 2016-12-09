<style scoped>

</style>

<template>
  <div class="">
    <Breadcrumb/>
    <VNav/>
  </div>
</template>

<script>
  import VNav from './VNav'
  import Breadcrumb from './NavView/Breadcrumb'

  export default {
    components: {
      VNav, Breadcrumb
    }
  }
</script>
