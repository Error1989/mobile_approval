<template>
  <div id="order_details">
    <header>
      <h3>订单详情</h3>
    </header>
    <div class="weui-cells" style="margin-top:0px;">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>订单ID：{{detailsData.id}}</p>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell" >
        <div class="weui-cell__bd">
          <p>创建日期：{{detailsData.update_time}}</p>
        </div>
        <div class="weui-cell__ft"><p style="color: #ff0000">{{detailsData.order_status}}</p></div>
      </div>
      <div class="weui-cells__title"><span>商品名称</span><span style="float: right">数量</span></div>
      <div class="weui-cell" v-for="item in detailsData.products">
        <div class="weui-cell__bd">
          <p>{{item.item_name}}</p>
        </div>
        <div class="weui-cell__ft" style="color: #000000">{{item.count}}</div>
      </div>
      <!--<div class="weui-cells__title"><span>辅料名称</span><span style="float: right">数量</span></div>-->
      <!--<div class="weui-cell" v-for="item in detailsData.accessories">-->
      <!--<div class="weui-cell__bd">-->
      <!--<p>{{item.item_name}}</p>-->
      <!--</div>-->
      <!--<div class="weui-cell__ft" style="color: #000000">{{item.count}}</div>-->
      <!--</div>-->
      <div class="weui-cells__title">收货人及地址信息</div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>收货人：{{detailsData.receiver_name}}</p>
          <p>收货人电话：{{detailsData.receiver_mobile}}</p>
          <!--<p>邮编：{{detailsData.receiver_zip}}</p>-->
          <p>省市区：{{detailsData.receiver_province+detailsData.receiver_city+detailsData.receiver_district}}</p>
          <p>街道地址：{{detailsData.receiver_address}}</p>
          <p>备注信息：{{detailsData.remark}}</p>
        </div>
        <div class="weui-cell__ft"></div>
      </div>

      <div class="weui-cells__title">物流信息</div>
      <div class="weui-cell" v-if="expressData.Success">
        <div class="weui-cell__bd">
          <p>快递公司：{{expressData.ShipperName}}</p>
          <p>快递单号：{{expressData.LogisticCode}}</p>
          <p>快递状态：<span style="color: #00b7ff">{{expressData.StateName}}</span></p>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell" v-if="!expressData.Success">
        <div class="weui-cell__bd">
          <p>快递状态：<span style="color: #00b7ff">未接收</span></p>
        </div>
        <div class="weui-cell__ft"></div>
      </div>

      <div class="weui-cells__title" v-if="expressData.Success">物流追踪</div>
        <yd-timeline>
          <yd-timeline-item v-for="(item,index) in expressData.Traces" :key="item.id">
            <p v-html="item.AcceptStation"> <span v-if="item.Remark">({{item.Remark}})</span></p>
            <p style="margin-top: 10px;">{{item.AcceptTime}}</p>
          </yd-timeline-item>
        </yd-timeline>
    </div>
    <div style="text-align: center;margin-top: 20px;">
      <img src="./../assets/loading.gif" v-if="loading">
    </div>
  </div>
</template>

<script>
  import url from '../api_url'
  import Vue from 'vue'
  export default {
    name: 'order_details',
    data () {
      return {
        loading:false,
        busy:true,
        detailsData:[],
        expressData:[],
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
      this.getOrder_details();
      this.getExpressData();
    },
    methods: {
      //获取订单的基本信息
      getOrder_details () {
        this.loading = true;
        this.$http.post(url.orderDetail,{
          order_id:this.$route.query.id,
          admin_id:window.localStorage.getItem('admin_id'),
          access_token:window.localStorage.getItem('access_token'),
        }).then(response=>{
          let res=response.data;
          this.detailsData=res.data;
          this.loading = false;
        })
      },
      //获取订单的物流信息
      getExpressData () {
        this.loading = true;
        this.$http.post(url.expressInfo,{
          order_id:this.$route.query.id,
          admin_id:window.localStorage.getItem('admin_id'),
          access_token:window.localStorage.getItem('access_token'),
        }).then(response=>{
          if (response.data.result === 1) {
            let res=response.data;
            this.expressData=res.data;
            this.expressData.Traces.reverse();
            this.loading = false;
          }else {
            return;
          }
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
    /*color: #3cc51f;*/
    width: 60%;
    margin: 0 auto;
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
  p {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .weui-cells__title {
    font-size: 15px;
    margin-top: 10px;
  }
  .weui-cell:before {
    left: 0;
  }
</style>
