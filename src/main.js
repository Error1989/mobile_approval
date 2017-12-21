// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import login from './components/login.vue'
import navcom from './components/navcom.vue'
import auditList from './components/auditList.vue'
import customerDebts from './components/customerDebts.vue'
import order from './components/order.vue'
import search from './components/search.vue'
import order_details from './components/order_details.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import infiniteScroll from 'vue-infinite-scroll'
import VueLazyLoad from 'vue-lazyload'
import Vuex from 'vuex'
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(infiniteScroll)
Vue.use(VueLazyLoad,{
  loading:'/src/assets/loading.gif'
})

//路由设置
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/navcom'
    },
    {
      path: '/login',
      name:'login',
      component: login
    },
    {
      path: '/navcom',
      name: 'navcom',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      component: navcom
    },
    {
      path: '/auditList',
      name: 'auditList',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      component: auditList
    },
    {
      path: '/customerDebts',
      name: 'customerDebts',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      component: customerDebts
    },
    {
      path: '/order',
      name: 'order',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      component: order,
    },
    {
      path: '/search',
      name: 'search',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      component: search,
    },
    {
      path: '/order_details',
      name: 'order_details',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      component: order_details
    },
  ]
})

//判断token
router.beforeEach((to, from, next) => {
  let access_token = window.localStorage.getItem('access_token');
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (access_token) {  // 通过vuex state获取当前的access_token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

Vue.http.interceptors.push((request, next) => {
  let access_token = window.localStorage.getItem('access_token');
  let admin_id =  window.localStorage.getItem('admin_id');
  if (access_token){//判断access_token是否存在
    Vue.http.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('access_token');//如果access_token存在，就在请求头中加入access_token
  }
  next((response) => {
    if (response.data.result == -99) {//判断access_token是否过期
      //清空过期的用户登录信息
      window.localStorage.removeItem('access_token');
      window.localStorage.removeItem('admin_id');
      this.$router.push({path:'/login'})//跳转到登录页
    }else{
      return response;//把response返回给then进行接收
    }
  })
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  template: '<App/>',
  components: { App, order, login, navcom, auditList, customerDebts, search, order_details,}
})
