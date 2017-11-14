<template>
    <div id="auditList">
      <header>
        <h3>付款审批</h3>
      </header>

      <!-- 容器 -->
      <div class="weui-tab">
        <div class="weui-navbar">
          <a class="weui-navbar__item weui-bar__item--on" href="#tab1">
            待审批
          </a>
          <a class="weui-navbar__item" href="#tab2">
            已完成
          </a>
        </div>
        <div class="weui-tab__bd">
          <div id="tab1" class="weui-tab__bd-item weui-tab__bd-item--active">
            <div class="weui-form-preview" v-for="(item,index) in msg" v-if="msg[index].transaction_status == '未审核' ">
              <h3 style="padding-top: 20px;">{{item.source_name}}</h3>
              <div class="weui-form-preview__hd">
                <label class="weui-form-preview__label">付款金额</label>
                <em class="weui-form-preview__value" style="color: #e64340;">¥{{item.amount}}</em>
              </div>
              <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">订单ID</label>
                  <span class="weui-form-preview__value">{{item.id}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">付款日期</label>
                  <span class="weui-form-preview__value">{{item.update_time}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">交易对象</label>
                  <span class="weui-form-preview__value">{{item.source_type}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">交易类型</label>
                  <span class="weui-form-preview__value">{{item.transaction_type}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">摘要</label>
                  <span class="weui-form-preview__value">{{item.balance_type}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">审批状态</label>
                  <span class="weui-form-preview__value">
                    <span style="color: #00bfff" v-for="item in msg[index].audits">{{' '+item.admin_name+item.audit_type}}</span>
                  </span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">备注</label>
                  <span class="weui-form-preview__value">
                    {{item.remark}}
                    <span v-for="item in msg[index].audits">{{' '+item.remark}}</span>
                  </span>
                </div>
              </div>
              <div class="weui-form-preview__ft">
                <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" @click="onSubmit(msg[index].id)">通过</button>
                <button type="button" style="color: #e64340;" class="weui-form-preview__btn weui-form-preview__btn_default" @click="prompt(msg[index].id,msg[index])">不通过</button>
              </div>
            </div>
          </div>
          <div id="tab2" class="weui-tab__bd-item">
            <div class="weui-form-preview" v-for="(item,index) in msg" v-if="msg[index].transaction_status == '已通过'">
              <h3 style="padding-top: 20px;">{{item.source_name}}</h3>
              <div class="weui-form-preview__hd">
                <label class="weui-form-preview__label">付款金额</label>
                <em class="weui-form-preview__value" style="color: #e64340;">¥{{item.amount}}</em>
              </div>
              <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">订单ID</label>
                  <span class="weui-form-preview__value">{{item.id}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">付款日期</label>
                  <span class="weui-form-preview__value">{{item.update_time}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">交易对象</label>
                  <span class="weui-form-preview__value">{{item.source_type}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">交易类型</label>
                  <span class="weui-form-preview__value">{{item.transaction_type}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">摘要</label>
                  <span class="weui-form-preview__value">{{item.balance_type}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">审批状态</label>
                  <span class="weui-form-preview__value">
                    <span style="color: #00bfff" v-for="item in msg[index].audits">{{' '+item.admin_name+item.audit_type}}</span>
                  </span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">备注</label>
                  <span class="weui-form-preview__value">
                    {{item.remark}}
                    <span v-for="item in msg[index].audits">{{' '+item.remark}}</span>
                  </span>
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
        name: 'auditList',
        data () {
            return {
              loading:false,
              busy:true,
              page:1,
              pagesize:8,
              msg:[],
            }
        },
        mounted () {
          this.getMsg();
        },
        methods: {
          //获取付款审批的信息
          getMsg (flag) {
            this.loading = true;
            this.$http.post('http://www.sikedaodi.com/jikebang/api/web/index.php?r=admin/transaction-audit-list',{
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

          //通过审核
          onSubmit (i) {
            this.$http.post('http://www.sikedaodi.com/jikebang/api/web/index.php?r=admin/audit',{
              admin_id:window.localStorage.getItem('admin_id'),
              access_token:window.localStorage.getItem('access_token'),
              transaction_id:i,
              audit_type:'已通过',
              remark: '',
            }).then(response=>{
              let res = response.data;
              $.toptip(res.msg, 'success');
            })
          },

          //点击不通过后弹出输入框
          prompt (i) {
            $.prompt("请输入审批不通过的原因", function(text) {
              //点击确认后的回调函数
              //text 是用户输入的内容

              //不通过审核
              $.ajax({
                type:'post',
                url:'http://www.sikedaodi.com/jikebang/api/web/index.php?r=admin/audit',
                dataType:'json',
                data:{
                  admin_id:window.localStorage.getItem('admin_id'),
                  access_token:window.localStorage.getItem('access_token'),
                  transaction_id:i,
                  audit_type:'已拒绝',
                  remark:text,
                },
                success:function (response) {
                  $.toptip(response.msg, 'success');
                },
                error:function (error) {
                  $.toptip("网络异常", 'warning');
                }
              });
            }, function() {
              //点击取消后的回调函数
            });
          },

          //分页功能
          loadMore () {
            this.busy=true;
            setTimeout(() => {
              this.page++;
              this.getMsg(true);
            }, 500);
          },
        },
    }
</script>

<style scoped>
  #auditList {
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
