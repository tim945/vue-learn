/*
 * @Author: tim
 * @Date: 2020-06-08 11:23:25
 * @LastEditors: tim
 * @LastEditTime: 2020-06-08 11:28:57
 * @Description: 日文全半角判断，直接使用 toZenkanaCase.js 里方法进行转换也没问题，因为转换不了的会返回原始值
 */ 

/**
 * 全半角字符unicode
 * 
 * 半角拉丁字符u0000 - u00FF, 半角日语字符uFF61 - uFF9F
 * u0020 – 007E  ASSCII可打印字符（半角英数字符）
 * \u00d7  × 符号
 * 
 * 全角数字(0-9) uFF10 - uFF19
 * 全角大英字(A-Z): uFF21 - uFF3A
 * 全角小英字(a-z): uFF41 - uFF5A
 * 全角平假名：u3040 - u309F
 * 全角片假名：u30A0 - u30FF
 * 全角Latin: uFF01 - uFF5E
 * 全角Symbol: uFFE0 - uFFE5
 * 全角中文：\u4e00-\u9fa5  \uff00-\uffff
 */
const halfReg = new RegExp("[\\x20-\\x7e|\\uff61-\\uff9f]","gi")
const fullReg = new RegExp("[\\uff10-\\uff5a|\\u3040-\\u309f|\\u30a0-\\u30ff|\\u4e00-\\u9fa5|\\uff01-\\uff5e|\\uffe0-\\uffe5]","gi")


/**
 * 判断是否为全角字符
 * 半角拉丁字符u0000 - u00FF, 半角日语字符uFF61 - uFF9F
 * u0020 – 007E  ASSCII可打印字符（半角英数字符）
 * @param {*} val
 * @reurn boolean
 */
export const isFullCase = function (val) {
  if (val) {
    return val.toString().match(halfReg) == null ? true:false
  }
  return true
}

/**
 * 判断是否为半角字符
 * @param {*} val
 * @reurn boolean
 */
export const isHalfCase = function (val) {
  if (val) {
    // return val.toString().match(/[^\x20-\x7e|\uff61-\uff9f]/ig) == null ? true : false
    return val.toString().match(fullReg) == null ? true : false
  }
  return true
}
