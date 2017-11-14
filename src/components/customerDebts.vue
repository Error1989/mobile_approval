<template>
    <div id="customerDebts">
      <header>
        <h3>客户货款</h3>
      </header>

      <!-- 容器 -->
      <div class="weui-tab">
        <div class="weui-navbar">
          <a class="weui-navbar__item weui-bar__item--on" href="#tab1">
            逾期未付
          </a>
          <a class="weui-navbar__item" href="#tab2">
            即将到期
          </a>
        </div>
        <div class="weui-tab__bd">
          <div id="tab1" class="weui-tab__bd-item weui-tab__bd-item--active">
            <!--搜索栏-->
            <div class="weui-search-bar" id="searchBar">
              <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                  <i class="weui-icon-search"></i>
                  <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required="" v-model="keyword" @keydown="clear">
                  <a class="weui-icon-clear" id="searchClear"></a>
                </div>
                <label class="weui-search-bar__label" id="searchText">
                  <i class="weui-icon-search"></i>
                  <span>搜索</span>
                </label>
              </form>
              <a class="weui-search-bar__cancel-btn" id="searchSubmit" @click="searchExpired">确认</a>
              <a class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
            </div>
            <!--客户及货款信息-->
            <div class="weui-form-preview" v-for="(item,index) in msg" v-if="msg[index].debt_status == '已逾期' ">
              <h3 style="padding-top: 20px;">{{item.name}}</h3>
              <div class="weui-form-preview__hd">
                <label class="weui-form-preview__label">逾期金额</label>
                <em class="weui-form-preview__value" style="color: #e64340;">¥{{item.debt_amount}}</em>
              </div>
              <div class="weui-form-preview__bd" style="border-bottom:1px solid #d9d9d9;">
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">客户ID</label>
                  <span class="weui-form-preview__value">{{item.id}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">电话号码</label>
                  <span class="weui-form-preview__value">{{item.phone}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">货款状态</label>
                  <span class="weui-form-preview__value">{{item.debt_status}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">备注</label>
                  <span class="weui-form-preview__value">{{item.remark}}</span>
                </div>
              </div>
              <!--已逾期的订单-->
                <div class="weui-form-preview__bd" style="border-bottom:1px solid #d9d9d9;">
                  <div class="weui-form-preview__item" v-for="(item,index) in msg[index].expired_orders">
                    <label class="weui-form-preview__label" style="color: #00bfff">{{index+1}}.应付日期 {{item.next_paytime}}</label>
                    <span class="weui-form-preview__value" style="color: #00bfff">{{item.order_no.split(',').length}}笔订单合计 ¥{{item.amount}}</span>
                  </div>
                </div>
            </div>
          </div>
          <div id="tab2" class="weui-tab__bd-item">
            <!--搜索栏-->
            <div class="weui-search-bar" id="searchBar2">
              <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                  <i class="weui-icon-search"></i>
                  <input type="search" class="weui-search-bar__input" id="searchInput2" placeholder="搜索" required="" v-model="keyword" @keydown="clear">
                  <a class="weui-icon-clear" id="searchClear2"></a>
                </div>
                <label class="weui-search-bar__label" id="searchText2">
                  <i class="weui-icon-search"></i>
                  <span>搜索</span>
                </label>
              </form>
              <a class="weui-search-bar__cancel-btn" id="searchSubmit2" @click="searchUnpaid">确认</a>
              <a class="weui-search-bar__cancel-btn" id="searchCance2">取消</a>
            </div>
            <!--客户及货款信息-->
            <div class="weui-form-preview" v-for="(item,index) in msg" v-if="msg[index].debt_status == '应付款' ">
              <h3 style="padding-top: 20px;">{{item.name}}</h3>
              <div class="weui-form-preview__hd">
                <label class="weui-form-preview__label">应付金额</label>
                <em class="weui-form-preview__value" style="color: #e64340;">¥{{item.debt_amount}}</em>
              </div>
              <div class="weui-form-preview__bd" style="border-bottom:1px solid #d9d9d9;">
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">编号ID</label>
                  <span class="weui-form-preview__value">{{item.id}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">电话号码</label>
                  <span class="weui-form-preview__value">{{item.phone}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">货款状态</label>
                  <span class="weui-form-preview__value">{{item.debt_status}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">备注</label>
                  <span class="weui-form-preview__value">{{item.remark}}</span>
                </div>
              </div>
              <!--未逾期，但下期应付款的订单-->
              <div class="weui-form-preview__bd" style="border-bottom:1px solid #d9d9d9;">
                <div class="weui-form-preview__item" v-for="(item,index) in msg[index].unpaid_orders">
                  <label class="weui-form-preview__label" style="color: #00bfff">{{index+1}}.应付日期 {{item.next_paytime}}</label>
                  <span class="weui-form-preview__value" style="color: #00bfff">{{item.order_no.split(',').length}}笔订单合计 ¥{{item.amount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" style="text-align: center;margin-top: 20px;">
        <img src="./../assets/loading.gif" v-if="loading">
      </div>

    </div>
</template>

<script>
    export default {
        name: 'customerDebts',
        data () {
            return {
              loading:false,
              busy:true,
              page:1,
              pagesize:8,
              keyword:'',
              msg:[],
              msg_key1:false,
              msg_key2:false,
            }
        },
        mounted () {
          this.getMsg();
        },
        methods: {
          //获取客户的货款信息
          getMsg (flag) {
            this.loading = true;
            this.$http.post('http://www.sikedaodi.com/jikebang/api/web/index.php?r=admin/customer-debts',{
              admin_id:window.localStorage.getItem('admin_id'),
              access_token:window.localStorage.getItem('access_token'),
              page:this.page,
              pagesize:this.pagesize,
            }).then(response=>{
              let res = response.data;
              this.loading = false;
              if(flag) {
                this.msg=this.msg.concat(res.data);//flag为true,分页的数据累加
                if(res.data.length<this.pagesize) {
                  this.busy=true;
                }else {
                  this.busy=false;
                }
              }else {
                this.msg=res.data;//第一次加载页面，数据不累加
                this.busy=false;
              }
            })
          },

          //搜索已逾期的货款信息
          searchExpired (flag) {
            this.loading = true;
            this.msg_key1 = true;
            this.$http.post('http://www.sikedaodi.com/jikebang/api/web/index.php?r=admin/customer-debts',{
              admin_id:window.localStorage.getItem('admin_id'),
              access_token:window.localStorage.getItem('access_token'),
              status:'已逾期',
              keyword:this.keyword,
              page:this.page,
              pagesize:this.pagesize,
            }).then(response=>{
              let res = response.data;
              this.loading = false;
              if(flag) {
                this.msg=this.msg.concat(res.data);//flag为true,分页的数据累加
                if(res.data.length<this.pagesize) {
                  this.busy=true;
                }else {
                  this.busy=false;
                }
              }else {
                this.msg=res.data;//第一次加载页面，数据不累加
                this.busy=false;
              }
            })
          },

          //搜索即将到期的货款信息
          searchUnpaid (flag) {
            this.loading = true;
            this.msg_key2 = true;
            this.$http.post('http://www.sikedaodi.com/jikebang/api/web/index.php?r=admin/customer-debts',{
              admin_id:window.localStorage.getItem('admin_id'),
              access_token:window.localStorage.getItem('access_token'),
              status:'应付款',
              keyword:this.keyword,
              page:this.page,
              pagesize:this.pagesize,
            }).then(response=>{
              let res = response.data;
              this.loading = false;
              if(flag) {
                this.msg=this.msg.concat(res.data);//flag为true,分页的数据累加
                if(res.data.length<this.pagesize) {
                  this.busy=true;
                }else {
                  this.busy=false;
                }
              }else {
                this.msg=res.data;//第一次加载页面，数据不累加
                this.busy=false;
              }
            })
          },

          //分页功能
          loadMore () {
            if (!this.msg_key1 && this.msg_key2) {
              this.busy=true;
              setTimeout(() => {
                this.page++;
                this.getMsg(true);
              }, 500);
            }else if (this.msg_key1) {
              this.busy=true;
              setTimeout(() => {
                this.page++;
                this.searchExpired(true);
              }, 500);
            }else if (this.msg_key2) {
              this.busy=true;
              setTimeout(() => {
                this.page++;
                this.searchUnpaid(true);
              }, 500);
            }
          },

          //搜索时清空msg的数据,并将page重置为1
          clear () {
            this.msg=[];
            this.page=1;
          },
        },
    }
</script>

<style scoped>
  #customerDebts {
    text-align: center;
  }
  header {
    padding: 10px 0;
    background-color: #3cc51f;
  }
  header h3{
    width: 60%;
    margin: 0 auto;
    color: #ffffff;
    font-weight: 400;
    font-size: 25px;
    text-align: center;
    font-family: "微软雅黑";
  }
  .weui-form-preview__value {
    color: #000000;
  }
  .weui-form-preview__hd:after {
    left: 0;
  }
</style>
