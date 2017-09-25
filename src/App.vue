<template>
  <div id="app">
    <router-view></router-view>
    <div class="weui-footer">
      <p class="weui-footer__links">
        <a href="tel:4009905949" class="weui-footer__link">联系客服</a>
      </p>
      <p class="weui-footer__text">北京物社文化传媒有限公司</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  },
  components: {

  },
}
</script>

<style scoped>
#app {
  font-family: "宋体";
  text-align: center;
}
.weui-footer {
  margin-top: 40px;
}
</style>
