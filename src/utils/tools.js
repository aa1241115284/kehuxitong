import CryptoJS from 'crypto-js'
import { MessageBox } from 'element-ui'
import { setItem,getItem } from "@/utils/localStorage";

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
/**
 * 时间格式化
 * @param { timestamps } Date 时间对象|时间戳
 * @param { startType } String year|yy-mm-dd|yy-mm
 * @return { String } 年月日
 */
export function dateFormat(timestamps, startType) {
  const d = new Date(timestamps)
  const year = d.getFullYear()
  const month = getHandleValue(d.getMonth() + 1)
  const day = getHandleValue(d.getDate())
  const hours = getHandleValue(d.getHours())
  const minutes = getHandleValue(d.getMinutes())
  const seconds = getHandleValue(d.getMinutes())
  let result = ''
  if (startType === 'year') {
    result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  } else if (startType === 'yy-mm-dd') {
    result = `${year}-${month}-${day}`
  } else if (startType === 'yy-mm') {
    result = `${year}-${month}`
  } else {
    result = `${year}-${month}-${day}`
  }
  return result
}
// 获取当前 年月日
export function datetime() {
  var time = (new Date()).getTime()
  var yesterday = new Date(time)
  return yesterday.getFullYear() + '-' + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : '0' + (yesterday.getMonth() + 1)) + '-' + (yesterday.getDate() > 9 ? (yesterday.getDate()) : '0' + (yesterday.getDate()))
}
// 获取当前 年月 第一天
export function datemonth() {
  var myDate = new Date()
  var tYear = myDate.getFullYear()
  var tMonth = myDate.getMonth()

  var m = tMonth + 1
  if (m.toString().length === 1) {
    m = '0' + m
  }
  return tYear + '-' + m + '-'+'01'
}
/**
 * 排序方法
 * @param { data } Object 表单对象
 * @param { sort } Object 表格排序对象
 * @return { Promise } 返回一个Promise对象
 */
export function sortMethods(data = {}, sort = {}) {
  return new Promise((resolve) => {
    const { prop, order } = sort
    const match = {
      descending: 'desc',
      ascending: 'asc'
    }
    if (!Object.keys(data).length) return
    if (Object.keys(data).includes('pageNum')) {
      data.pageNum = 1
    }
    data.order = match[order] || ''
    data.sort = toLine(prop)
    resolve()
  })
}
/**
 * @param { msg } String 提示信息
 * @param { tips } String 提示标题
 * @return { Promise } Object .then(instance => {
 *  请求成功后👇
 *  instance.confirmButtonLoading = false
 *  instance.close()
 * })回调
*/
export function confirm(msg, tips, options) {
  const defaultConfig = {
    type: 'warning'
  }
  lteration(options, defaultConfig)
  return new Promise(resolve => {
    MessageBox.confirm(msg, tips, {
      showClose: false,
      showCancelButton: true,
      closeOnClickModal: false,
      dangerouslyUseHTMLString: true,
      type: defaultConfig.type,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.showCancelButton = false
          instance.confirmButtonLoading = true
          resolve(instance)
        } else {
          done()
        }
      }
    }).then(cancel => {})
  })
}

/**
 * @param { name } String 驼峰名
 * @return { String } 下划线的字符串
*/
function toLine(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}
// 防抖函数
export function debounce(func, wait, immediate) {
  let timeout
  return function(...args) {
    const _this = this
    if (timeout) clearTimeout(timeout)

    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      if (callNow) func.apply(_this, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(_this, args)
      }, wait)
    }
  }
}
/**
 * 外部参数 替换 默认配置 （多用于覆盖组件内部的默认配置）
 * @param { parame } Object 外部对组件内的参数配置
 * @param { options } Object 组件内部的参数配置
*/
export function lteration(parame = {}, options) {
  const keys = Object.keys(parame)
  if (!keys.length) return
  keys.forEach(item => {
    if (Object.prototype.hasOwnProperty.call(options, item)) {
      if (Object.prototype.toString.call(parame[item]) === '[object Object]') {
        lteration(parame[item], options[item])
      } else {
        options[item] = parame[item]
      }
    }
  })
  return options
}

// AES数据加密
export const encrypt = (data) => {
  const key = CryptoJS.enc.Utf8.parse('1234567890abcDEF')
  const srcs = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
// AES 数据解密
export const decrypt = (data) => {
  const key = CryptoJS.enc.Utf8.parse('1234567890abcDEF')
  const decrypt = CryptoJS.AES.decrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
const getHandleValue = num => {
  return num < 10 ? `0${num}` : num
}
// 按钮权限
export const btnjust = (name,childrenname,val) => {
  const List =  getItem('jurlist')
  // console.log(List)
  const arr = List.filter(function (el,index) {
    return el.name==name
 });
 const arrList = arr[0].children
 const newarr = arrList.filter(function (el,index) {
  return el.name==childrenname
});
// console.log(newarr)

 var qx = newarr[0].meta.permissions
//  console.log(qx)
 return (qx.indexOf(val)>-1)?true:false
}