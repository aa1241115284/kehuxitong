import request from './request'
import qs from 'qs'
export var url = 'http://192.168.1.100:31550' // 测试
// export var url = 'http://192.168.1.169:10005' // 费红云
export function login (parame) {
  return request.post(`${url}/login`, parame)
}
// 修改密码
export function findPwd (parame) {
  return request.post(`${url}/findPwd`, parame)
}

// export function logout (parame) {
//   return request.get(`${url}/logout?${qs.stringify(parame)}`)
// }
// 广告投放 方块
export function advertisingList (parame) {
  return request.post(`${url}/advertising/advertisingList`, parame)
}
// 广告投放 订单列表
export function advertisingOrder (parame) {
  return request.post(`${url}/advertising/advertisingOrder`, parame)
}
// 广告投放 详情
export function advertisingDetails (parame) {
  return request.post(`${url}/advertising/advertisingDetails`, parame)
}
// 广告投放配置
export function advertisingConfig (parame) {
  return request.post(`${url}/advertising/advertisingConfig`, parame)
}
// 广告投放提交
export function advertisingSubmit (parame) {
  return request.post(`${url}/advertising/advertisingSubmit`, parame)
}

// 公司注册 方块
export function companyList (parame) {
  return request.post(`${url}/company/companyList`, parame)
}
// 公司注册 订单列表
export function companyOrder (parame) {
  return request.post(`${url}/company/companyOrder`, parame)
}
// 公司注册 详情
export function companyDetails (parame) {
  return request.post(`${url}/company/companyDetails`, parame)
}
// 公司注册配置
export function companyConfig (parame) {
  return request.post(`${url}/company/companyConfig`, parame)
}
// 公司注册提交
export function companySubmit (parame) {
  return request.post(`${url}/company/companySubmit`, parame)
}

// 网红营销 方块
export function celebrityList (parame) {
  return request.post(`${url}/celebrity/celebrityList`, parame)
}
// 网红营销 订单列表
export function celebrityOrder (parame) {
  return request.post(`${url}/celebrity/celebrityOrder`, parame)
}
// 网红营销 详情
export function celebrityDetails (parame) {
  return request.post(`${url}/celebrity/celebrityDetails`, parame)
}
// 网红营销配置
export function celebrityConfig (parame) {
  return request.post(`${url}/celebrity/celebrityConfig`, parame)
}
// 网红营销提交
export function celebritySubmit (parame) {
  return request.post(`${url}/celebrity/celebritySubmit`, parame)
}

// 商城建站 方块
export function websitelist (parame) {
  return request.get(`${url}/website/list?${qs.stringify(parame)}`)
}
// 商城建站 订单列表
export function websiteorderlist (parame) {
  return request.post(`${url}/website/order/list`, parame)
}
// 商城建站 建站订单详情
export function websitedetails (parame) {
  return request.get(`${url}/website/order/details?${qs.stringify(parame)}`)
}
// 商城建站配置
export function websitetemplate (parame) {
  return request.get(`${url}/website/template?${qs.stringify(parame)}`)
}
// 商城建站提交
export function websiteapply (parame) {
  return request.post(`${url}/website/apply`, parame)
}

// 支付渠道 方块
export function paymentlist (parame) {
  return request.get(`${url}/payment/list?${qs.stringify(parame)}`)
}
// 支付渠道 订单列表
export function paymentorderlist (parame) {
  return request.post(`${url}/payment/order/list`, parame)
}
// 支付渠道 建站订单详情
export function paymentorderdetails (parame) {
  return request.get(`${url}/payment/order/details?${qs.stringify(parame)}`)
}
// 支付渠道 配置
export function paymenttemplate (parame) {
  return request.get(`${url}/payment/template?${qs.stringify(parame)}`)
}
// 支付渠道 提交
export function paymentapply (parame) {
  return request.post(`${url}/payment/apply`, parame)
}

// 消费统计 列表
export function statisticslist (parame) {
  return request.post(`${url}/statistics/bill/list`, parame)
}

// 消费统计 详情
export function statisticsdetails (parame) {
  return request.get(`${url}/statistics/bill/details?${qs.stringify(parame)}`)
}

// 员工账号管理 列表
export function customerlist (parame) {
  return request.post(`${url}/customer/user/list`, parame)
}
// 员工账号管理 角色下拉框
export function customerrolelist (parame) {
  return request.post(`${url}/customer/role/list`, parame)
}
// 员工账号管理 修改状态
export function customerfreeze (parame) {
  return request.get(`${url}/customer/user/freeze?${qs.stringify(parame)}`)
}

// 员工账号管理 删除
export function customerdelete (parame) {
  return request.get(`${url}/customer/user/delete?${qs.stringify(parame)}`)
}

// 员工账号管理 新增
export function customeradd (parame) {
  return request.post(`${url}/customer/user/add`, parame)
}

// 员工账号管理 编辑回显
export function getcustomerupdate (parame) {
  return request.get(`${url}/customer/user/update?${qs.stringify(parame)}`)
}

// 员工账号管理 编辑提交
export function postcustomerupdate (parame) {
  return request.post(`${url}/customer/user/update`, parame)
}

// 角色管理 修改状态
export function customerrolefreeze (parame) {
  return request.get(`${url}/customer/role/freeze?${qs.stringify(parame)}`)
}

// 角色管理 删除
export function customerroledelete (parame) {
  return request.get(`${url}/customer/role/delete?${qs.stringify(parame)}`)
}

// 角色管理 权限列表
export function permissions (parame) {
  return request.get(`${url}/customer/role/permissions?${qs.stringify(parame)}`)
}

// 角色管理 新增
export function customerroleadd (parame) {
  return request.post(`${url}/customer/role/add`, parame)
}

// 角色管理 编辑回显
export function customerroleupdate (parame) {
  return request.get(`${url}/customer/role/update?${qs.stringify(parame)}`)
}

// 角色管理 编辑
export function postcustomerroleupdate (parame) {
  return request.post(`${url}/customer/role/update`, parame)
}

// 图片上传
export function ossupload (parame) {
  return request.post(`${url}/oss/uploadBase64`, parame)
}
// 主页用户信息
export function userInfos (parame) {
  return request.get(`${url}/userInfos?${qs.stringify(parame)}`)
}

// 权限
export function menu (parame) {
  return request.get(`${url}/menu?${qs.stringify(parame)}`)
}
