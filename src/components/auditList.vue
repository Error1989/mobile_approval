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
            <div style="margin-bottom: 20px;" class="weui-form-preview" v-for="(item,index) in msg">
              <h3 style="padding-top: 10px;">{{item.source_name}}</h3>
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
                  <label class="weui-form-preview__label">交易类型</label>
                  <span class="weui-form-preview__value">{{item.transaction_type}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">摘要</label>
                  <span class="weui-form-preview__value">{{item.balance_type}}</span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">审核状态</label>
                  <span class="weui-form-preview__value" v-for="item in msg[index].audits" v-if="msg[index].audits[0].admin_name">
                    {{item.admin_name+item.audit_type}}
                  </span>
                </div>
                <div class="weui-form-preview__item">
                  <label class="weui-form-preview__label">备注</label>
                  <span class="weui-form-preview__value">{{item.remark}}</span>
                </div>
              </div>
              <div class="weui-form-preview__ft">
                <a class="weui-form-preview__btn weui-form-preview__btn_primary">通过</a>
                <a style="color: #e64340;" class="weui-form-preview__btn weui-form-preview__btn_default">不通过</a>
              </div>
            </div>
          </div>
          <div id="tab2" class="weui-tab__bd-item">
            <h1>页面二</h1>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: 'auditList',
        data () {
            return {
              page: 1,
              pagesize: 8,
              msg: [],
            }
        },
        mounted () {
          this.getMsg();
        },
        methods: {
          //获取未审批的信息
          getMsg () {
            this.$http.post('http://www.sikedaodi.com/jikebang/api/web/index.php?r=admin/transaction-audit-list',{
              admin_id:window.localStorage.getItem('admin_id'),
              access_token:window.localStorage.getItem('access_token'),
              page:this.page,
              pagesize:this.pagesize,
            }).then(response=>{
              let res = response.data;
              this.msg=res.data;
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
</style>
