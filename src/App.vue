<template>
  <div id="app" class="wrap">
    <SideBar></SideBar>
    <div class="main">
        <div class="right-header">

        </div>
        <div class="right-main">
            <router-view/>
        </div>
        <footer class="footer">
            Copyright©上海琪翔羽信息科技有限公司. All right reserved.
        </footer>
    </div>
  </div>
</template>

<script>
import SideBar from '@/views/layout'
export default {
  name: 'App',
  components: {
      SideBar,
  },
  data () {
      return {
      }
  }
}
</script>

<style>

</style>
