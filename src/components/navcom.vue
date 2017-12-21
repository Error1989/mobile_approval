<template>
    <div id="navcom">
      <header>
        <h3>物社boss版本</h3>
      </header>

      <div class="weui-grids">
        <!--banner图片-->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="../assets/img/banner3.jpg" alt=""></div>
          </div>
          <!-- Add Pagination -->
          <!--<div class="swiper-pagination"></div>-->
        </div>

        <router-link to="/auditList" class="weui-grid js_grid">
          <div class="weui-grid__icon">
            <img src="../assets/img/2.png" alt="付款审批">
          </div>
          <p class="weui-grid__label">
            付款审批
            <span class="weui-badge" style="position: absolute;line-height: 11px;">{{tips}}</span>
          </p>
        </router-link><router-link to="/customerDebts" class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="../assets/img/3.png" alt="客户货款">
        </div>
        <p class="weui-grid__label">
          客户货款
        </p>
      </router-link>
        <router-link to="/order" class="weui-grid js_grid">
          <div class="weui-grid__icon">
            <img src="../assets/img/1.png" alt="新增订单">
          </div>
          <p class="weui-grid__label">
            新增订单
          </p>
        </router-link>
        <router-link to="/search" class="weui-grid js_grid">
          <div class="weui-grid__icon">
            <img src="../assets/img/4.png" alt="查询订单">
          </div>
          <p class="weui-grid__label">
            查询订单
          </p>
        </router-link>
        <a class="weui-grid js_grid open-popup" href="javascript:;" data-target="#changePassword">
          <div class="weui-grid__icon">
            <img src="../assets/img/5.png" alt="修改密码">
          </div>
          <p class="weui-grid__label">
            修改密码
          </p>
        </a>
        <a @click="logout" class="weui-grid js_grid">
          <div class="weui-grid__icon">
            <img src="../assets/img/6.png" alt="退出登录">
          </div>
          <p class="weui-grid__label">
            退出登录
          </p>
        </a>

        <!--修改密码-->
        <div id="changePassword" class="weui-popup__container popup-bottom">
          <div class="weui-popup__overlay"></div>
          <div class="weui-popup__modal">
            <div class="toolbar">
              <div class="toolbar-inner">
                <a href="javascript:;" class="picker-button close-popup">关闭</a>
                <h1 class="title">修改密码</h1>
              </div>
            </div>
            <div class="modal-content">
              <div class="weui-grids">
                <div class="weui-cell">
                  <div class="weui-cell__hd"><label class="weui-label">旧密码：</label></div>
                  <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入旧密码" v-model.trim="password">
                  </div>
                </div>
                <div class="weui-cell">
                  <div class="weui-cell__hd"><label class="weui-label">新密码：</label></div>
                  <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入新密码" v-model.trim="new_password">
                  </div>
                </div>
                <div class="weui-cell">
                  <div class="weui-cell__hd"><label class="weui-label">确认新密码：</label></div>
                  <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请再次输入新密码" v-model.trim="new_password2">
                  </div>
                </div>
                <a href="javascript:;" class="weui-btn weui-btn_primary" v-if="password&&new_password&&new_password2&&new_password==new_password2" @click="changePassword">提交</a>
                <a href="javascript:;" class="weui-btn weui-btn_primary weui-btn_disabled" v-else>提交</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
  import url from '../api_url'
    export default {
        name: 'navcom',
        data () {
            return {
              tips: '',
              password: '',
              new_password: '',
              new_password2: '',
            }
        },
      components: {url},
      mounted () {
        $(".swiper-container").swiper({
          pagination: '.swiper-pagination',
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 5000,
          autoplayDisableOnInteraction: false
        });
        this.getTips();
      },
      methods: {
        //获取付款审批组件内未处理信息的总数
        getTips () {
          this.$http.post(url.transactionCount,{
            admin_id:window.localStorage.getItem('admin_id'),
            access_token:window.localStorage.getItem('access_token'),
          }).then(response=>{
            let res = response.data;
            this.tips=res.data;
          })
        },

        //退出当前系统
        logout () {
          window.localStorage.removeItem('admin_id');
          window.localStorage.removeItem('access_token');
          this.$router.push({path:'/login'});
        },

        //修改密码
        changePassword () {
          this.$http.post(url.changePassword,{
            admin_id:window.localStorage.getItem('admin_id'),
            access_token:window.localStorage.getItem('access_token'),
            password:this.password,
            new_password:this.new_password,
          }).then(response=>{
              let res = response.data;
            if (res.result==1) {
              $.toptip('密码已修改成功', 'success');
            }else {
              $.toptip('密码修改失败', 'error');
            }
          },error=>{
            $.toptip('网络异常', 'warning');
          })
        },
      }
    }
</script>

<style scoped>
  header {
    padding: 10px 0;
    background-color: #3cc51f;
  }
  header h3{
    color: #ffffff;
    font-weight: 400;
    font-size: 25px;
    text-align: center;
    font-family: "微软雅黑";
  }
  .swiper-container {
    width: 100%;
    height: auto;
  }
  .swiper-container img {
    max-width:100%;
    height:auto;
  }
  .weui-btn {
    width: 70%;
  }
  .weui-btn_primary {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
