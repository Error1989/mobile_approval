<template>
  <div id="search">
    <header>
      <h3>查询订单</h3>
    </header>
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
      <a class="weui-search-bar__cancel-btn" id="searchSubmit" @click="searchOrder">确认</a>
      <a class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
    </div>

    <div class="weui-cells" v-for="(item,index) in searchData">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>{{index+1}}.{{item.receiver_province+item.receiver_city+item.receiver_district}}</p>
          <p class="weui-media-box__desc">收货人：{{item.receiver_name}}</p>
          <p class="weui-media-box__desc">收货人电话：{{item.receiver_mobile}}</p>
          <p class="weui-media-box__desc">创建时间：{{item.update_time}}</p>
        </div>
        <div class="weui-cell__ft" style="text-align: center">
          <p style="color: #ff0000">{{item.order_status}}</p>
          <router-link class="weui-btn weui-btn_mini weui-btn_plain-primary" :to="{path:'/order_details',query: {id: item.id}}">详细信息</router-link>
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
    name: 'search',
    data () {
      return {
        loading:false,
        searchData: [],
        page:1,
        pagesize:8,
        keyword:'',
        busy:true,
      }
    },
    mounted () {
      this.getSearch();
    },
    methods: {
      //获取订单的数据
      getSearch(flag){
        this.loading = true;
        this.$http.post('http://www.sikedaodi.com/jikebang/api/web/index.php?r=admin/orders',{
          admin_id:window.localStorage.getItem('admin_id'),
          access_token:window.localStorage.getItem('access_token'),
          page:this.page,
          pagesize:this.pagesize,
        })
          .then(response=>{
            let res = response.data;
            this.loading = false;
            if(flag) {
              this.searchData=this.searchData.concat(res.data);//flag为true,分页的数据累加
              if(res.data.length<this.pagesize) {
                this.busy=true;
              }else {
                this.busy=false;
              }
            }else {
              this.searchData=res.data;//第一次加载页面，数据不累加
              this.busy=false;
            }
          })
      },

      //搜索订单数据
      searchOrder(flag){
        this.loading = true;
        this.$http.post('http://www.sikedaodi.com/jikebang/api/web/index.php?r=admin/orders',{
          admin_id:window.localStorage.getItem('admin_id'),
          access_token:window.localStorage.getItem('access_token'),
//          ismy:1,
          keyword:this.keyword,
          page:this.page,
          pagesize:this.pagesize,
        }).then(response=>{
            let res = response.data;
            this.loading = false;
            if(flag) {
              this.searchData=this.searchData.concat(res.data);//flag为true,分页的数据累加
              if(res.data.length<this.pagesize) {
                this.busy=true;
              }else {
                this.busy=false;
              }
            }else {
              this.searchData=res.data;//第一次加载页面，数据不累加
              this.busy=false;
            }
          })
      },

      //分页功能
      loadMore(){
        this.busy=true;
        setTimeout(() => {
          this.page++;
          this.getSearch(true);
          this.searchOrder(true);
        }, 500);
      },

      //搜索时清空msg的数据,并将page重置为1
      clear () {
        this.searchData=[];
        this.page=1;
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
  .weui-media-box__desc {
    margin-top: 5px;
  }
  .weui-btn {
    margin-top: 10px;
  }
</style>
