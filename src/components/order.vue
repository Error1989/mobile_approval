<template>
  <div id="order">
    <header>
      <h3>新增订单</h3>
    </header>
    <div class="weui-cells weui-cells_form">
      <div style="text-align: center;margin-top: 15px;margin-bottom: 10px;">
        <a href="javascript:;" class="open-popup weui-btn weui-btn_mini weui-btn_plain-primary" data-target="#products_data">选择商品</a>
        <!--<a href="javascript:;" class="open-popup weui-btn weui-btn_mini weui-btn_plain-primary" data-target="#accessories_data" style="margin-left: 15px">选择辅料</a>-->
      </div>
      <!--商品信息部分-->
      <div class="weui-cells__title">商品名称/数量</div>
      <div class="weui-cells">
        <div class="weui-cell" v-for="(item,index) in products">
          <div class="weui-cell__hd"><p>{{item.name}}</p></div>
          <div class="weui-cell__bd">
            <input class="weui-input" pattern="[0-9]*" type="number" style="float: right;text-align: center;border: 1px solid #d9d9d9;border-radius: 5px;width: 50px;" v-model.trim="products[index].count">
          </div>
          <div class="weui-cell__ft" style="margin-left: 10%">
            <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" @click="delProducts(index)">删除</a>
          </div>
        </div>
      </div>
      <!--辅料信息部分-->
      <!--<div class="weui-cells__title">辅料名称/数量</div>-->
      <!--<div class="weui-cells">-->
      <!--<div class="weui-cell" v-for="(item,index) in accessories">-->
      <!--<div class="weui-cell__hd"><p>{{item.name}}</p></div>-->
      <!--<div class="weui-cell__bd">-->
      <!--<input class="weui-input" pattern="[0-9]*" type="number" style="float: right;text-align: center;border: 1px solid #d9d9d9;border-radius: 5px;width: 45px;" v-model.trim="accessories[index].count">-->
      <!--</div>-->
      <!--<div class="weui-cell__ft" style="margin-left: 10%">-->
      <!--<a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_warn" @click="delAccessories(index)">删除</a>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <!--选择商品部分（遮罩层）-->
    <div id="products_data" class="weui-popup__container">
      <div class="weui-popup__overlay"></div>
      <div class="weui-popup__modal">
        <header>
          <h3>选择商品</h3>
        </header>
        <div class="weui-cells">
          <div class="weui-cell" v-for="(item,index) in productsData">
            <div class="weui-cell__bd">
              <p>{{index+1}}.{{item.name}}</p>
            </div>
            <div class="weui-cell__ft">
              <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_plain-primary" @click.once="addProducts(index)">选择</a>
            </div>
          </div>
        </div>
        <a href="javascript:;" class="close-popup weui-btn weui-btn_primary" data-target="">关 闭</a>
      </div>
    </div>
    <!--选择辅料部分（遮罩层）-->
    <div id="accessories_data" class="weui-popup__container">
      <div class="weui-popup__overlay"></div>
      <div class="weui-popup__modal">
        <header>
          <h3>选择辅料</h3>
        </header>
        <div class="weui-cells">
          <div class="weui-cell" v-for="(item,index) in accessoriesData">
            <div class="weui-cell__bd">
              <p>{{index+1}}.{{item.name}}</p>
            </div>
            <div class="weui-cell__ft">
              <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_plain-primary" @click.once="addAccessories(index)">选择</a>
            </div>
          </div>
        </div>
        <a href="javascript:;" class="close-popup weui-btn weui-btn_primary" data-target="">关 闭</a>
      </div>
    </div>

    <div style="text-align: center;margin-top: 40px;margin-bottom: 10px;">
      <a href="javascript:;" class="open-popup weui-btn weui-btn_mini weui-btn_plain-primary" data-target="#address_data">选择收货人及地址信息</a>
    </div>
    <!--选择收货人及地址部分（遮罩层）-->
    <div id="address_data" class="weui-popup__container">
      <div class="weui-popup__overlay"></div>
      <div class="weui-popup__modal">
        <header>
          <h3>收货人及地址</h3>
        </header>
        <div class="weui-cells">
          <div class="weui-cell" v-for="(item,index) in addressData">
            <div class="weui-cell__bd">
              <p>收货人：{{item.receiver_name}}<br/>
                收货人电话：{{item.receiver_phone}}<br/>
                省市区：{{item.receiver_province+item.receiver_city+item.receiver_district}}<br/>
                街道地址：{{item.receiver_address}}
              </p>
            </div>
            <div class="weui-cell__ft">
              <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_plain-primary" @click="addAddress(index)">选择</a>
            </div>
          </div>
        </div>
        <a href="javascript:;" class="close-popup weui-btn weui-btn_primary" data-target="">关 闭</a>
      </div>
    </div>

    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">姓名：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入收货人姓名" v-model.trim="receiver_name">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">手机号：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="tel" pattern="[0-9]*" placeholder="请输入收货人的手机号" v-model.trim="receiver_mobile">
        </div>
      </div>
      <div data-toggle="distpicker" id="distpicker3">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">省：</label></div>

          <div class="weui-cell__bd">
            <select class="form-control" style="width: 110px;height:26px;" id="receiver_province" v-model="receiver_province"></select>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">市：</label></div>

          <div class="weui-cell__bd">
            <select class="form-control" style="width: 110px;height:26px;" id="receiver_city" v-model="receiver_city"></select>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">区：</label></div>

          <div class="weui-cell__bd">
            <select class="form-control" style="width: 110px;height:26px" id="receiver_district" v-model="receiver_district"></select>
          </div>
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">地址：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入收货人的街道地址" v-model="receiver_address">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">指定快递：</label></div>
        <div class="weui-cell__bd">
          <div class="weui-cell__ft">
            <input class="weui-switch" type="checkbox" checked="checked" v-model="isExpress">
          </div>
        </div>
      </div>
      <!--<div class="weui-cell" v-if="isExpress">-->
        <!--<div class="weui-cell__hd"><label class="weui-label">邮编：</label></div>-->
        <!--<div class="weui-cell__bd">-->
          <!--<input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入邮政编号（可不填）" v-model.trim="receiver_zip">-->
        <!--</div>-->
      <!--</div>-->
      <div class="weui-cell weui-cell_select weui-cell_select-after" v-if="isExpress">
        <!--<div class="weui-cell__hd">-->
          <!--<label for="" class="weui-label">快递公司</label>-->
        <!--</div>-->
        <div class="weui-cell__bd">
          <select class="weui-select" v-model="expressMess">
            <option disabled value="">请选择快递公司</option>
            <option v-for="item in expressData" :value="item.code+'-'+item.name">{{item.name}}</option>
          </select>
        </div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" placeholder="请在此处输入备注信息（可不填）" rows="3" v-model="remark"></textarea>
            <div class="weui-textarea-counter"><span>0</span>/200</div>
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="weui-btn weui-btn_primary weui-flex__item " v-if="receiver_name&&receiver_mobile&&receiver_province&&receiver_city&&receiver_district&&receiver_address&&products&&expressMess" @click="onSubmit">提交信息</button>
    <button type="submit" class="weui-btn weui-btn_primary weui-flex__item " v-else-if="receiver_name&&receiver_mobile&&receiver_province&&receiver_city&&receiver_district&&receiver_address&&products&&isExpress==false" @click="onSubmit">提交信息</button>
    <button type="submit" class="weui-btn weui-btn_primary weui-flex__item weui-btn_disabled" v-else>提交订单</button>
  </div>
</template>
<script>
  import url from '../api_url'
  export default {
    name: 'order',
    data () {
      return {
        //商品数据
        productsData: [],
        //辅料数据
        accessoriesData: [],
        //收货人及地址信息
        addressData: [],
        //快递公司数据
        expressData: [],

        products:[],
        accessories:[],
        receiver_name: '',
        receiver_mobile: '',
        receiver_address: '',
        receiver_zip: '',
        isExpress: true,
        expressMess: '',
        remark: '',
        receiver_province: '',
        receiver_city: '',
        receiver_district: '',
      }
    },
    components: {url},
    watch: {
      isExpress: function () {
        this.receiver_zip = '';
        this.expressMess = '';
      }
    },
    mounted () {
      this.getProductsData();
//      this.getAccessoriesData();
      this.getAddressData();
      this.getExpress();
      $("#distpicker3").distpicker({

      });
    },
    methods: {
      //添加商品功能
      addProducts (i) {
        this.products.push(this.productsData[i]);
        $.toptip('选择成功', 'success');
      },
      //删除商品功能
      delProducts (i) {
        this.products.splice(i,1);
      },
      //添加辅料功能
      addAccessories (i) {
        this.accessories.push(this.accessoriesData[i]);
        $.toptip('选择成功', 'success');
      },
      //删除辅料功能
      delAccessories (i) {
        this.accessories.splice(i,1);
      },
      //添加收货人及地址信息
      addAddress (i) {
        this.receiver_name = this.addressData[i].receiver_name;
        this.receiver_mobile = this.addressData[i].receiver_phone;
        this.receiver_province = this.addressData[i].receiver_province;
        this.receiver_city = this.addressData[i].receiver_city
        this.receiver_district = this.addressData[i].receiver_district;
        this.receiver_address = this.addressData[i].receiver_address;
//        this.receiver_zip = this.addressData[i].receiver_zip;
        $("#distpicker3").distpicker('destroy');
        $("#distpicker3").distpicker({
          province: this.receiver_province,
          city: this.receiver_city,
          district: this.receiver_district
        });
        $.toptip('选择成功', 'success');
      },
      //订单提交功能
      onSubmit () {
        this.$http.post(url.submitOrder,{
          products:this.products,
//          accessories:this.accessories,
          receiver_name:this.receiver_name,
          receiver_mobile:this.receiver_mobile,
          receiver_address:this.receiver_address,
//          receiver_zip:this.receiver_zip,
          express_code:this.expressMess.split('-')[0],
          express_name: this.expressMess.split('-')[1],
          remark:this.remark,
          receiver_province:this.receiver_province,
          receiver_city:this.receiver_city,
          receiver_district:this.receiver_district,
          admin_id:window.localStorage.getItem('admin_id'),
          access_token:window.localStorage.getItem('access_token'),
        }).then((response) => {
          $.toptip(response.data.msg, 'success');
          this.$router.push({path:'/navcom'});
        },(error) => {
          $.toptip('网络异常', 'warning');
        })
      },
      //获取商品的数据（遮罩层）
      getProductsData () {
        this.$http.post(url.productList,{
          admin_id:window.localStorage.getItem('admin_id'),
          access_token:window.localStorage.getItem('access_token'),
        }).then(response=>{
          let res = response.data;
          this.productsData=res.data;
        })
      },
      //获取辅料的数据（遮罩层）
      getAccessoriesData () {
        this.$http.post(url.accessoryList,{
          admin_id:window.localStorage.getItem('admin_id'),
          access_token:window.localStorage.getItem('access_token'),
        }).then(response=>{
          let res = response.data;
          this.accessoriesData=res.data;
        })
      },
      //获取收货人及地址的数据（遮罩层）
      getAddressData () {
        this.$http.post(url.adressList,{
          admin_id:window.localStorage.getItem('admin_id'),
          access_token:window.localStorage.getItem('access_token'),
        }).then(response=>{
          let res = response.data;
          this.addressData=res.data;
        })
      },

      //获取快递公司信息
      getExpress () {
        this.$http.post(url.expressList,{
          admin_id:window.localStorage.getItem('admin_id'),
          access_token:window.localStorage.getItem('access_token'),
        }).then(response=>{
          let res = response.data;
          this.expressData=res.data;
        })
      },
    },
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
  button.weui-btn {
    width: 70%;
  }
  button {
    margin-top: 50px;
  }
  .close-popup {
    width: 70%;
    margin-top: 20px;
  }
  .weui-cells {
    margin-top:0px;
  }
  .weui-cell:before {
    left: 0;
  }
</style>
