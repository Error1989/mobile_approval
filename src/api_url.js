/**
 * Created by Acer on 2017-12-11.
 */
let base_url = 'http://www.sikedaodi.com/jikebang/api/web/index.php?';

let url = {
  //登录接口
  login: base_url+'r=admin/login',
  //付款审批组件内获取付款信息的接口
  auditList: base_url+'r=admin/transaction-audit-list',
  //付款审批组件内审批付款的接口
  audit: base_url+'r=admin/audit',
  //客户货款组件内获取货款信息的接口
  customerDebts: base_url+'r=admin/customer-debts',
  //导航组件内获取付款审批未处理信息总数的接口
  transactionCount: base_url+'r=admin/active-transaction-count',
  //导航组件内修改密码的接口
  changePassword: base_url+'r=admin/change-password',
  //新增订单组件内提交订单数据的接口
  submitOrder: base_url+'r=admin/submit-order',
  //新增订单组件内获取商品数据的接口
  productList: base_url+'r=product/list',
  //新增订单组件内获取辅料数据的接口
  accessoryList: base_url+'r=product/accessory-list',
  //新增订单组件内获取收货人及地址信息的接口
  adressList: base_url+'r=admin/address-list',
  //新增订单组件内获取快递公司的接口
  expressList: base_url+'r=common/express-list',
  //查询订单组件内获取订单数据的接口
  order: base_url+'r=admin/orders',
  //订单详情组件内获取订单详细信息的接口
  orderDetail: base_url+'r=admin/order-detail',
  //订单详情组件内获取物流信息的接口
  expressInfo: base_url+'r=common/express-info',
};
module.exports = url;
