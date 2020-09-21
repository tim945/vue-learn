/*
 * @Author: tim
 * @Date: 2020-08-17 13:20:35
 * @LastEditors: tim
 * @LastEditTime: 2020-09-21 14:30:53
 * @Description: message 消息统一处理  整合 elementUI 中的 Message 消息提示、MessageBox 弹框、Notification 通知
 */

// 提示消息内容增加 html 支持

/**
 * 修改步骤：
 * 1. 在 main.js 全局注册消息内容渲染组件 
 * import MessageContent from './index'
 * Vue.component('MessageContent', MessageContent)
 * 
 * 2. 在原封装的消息库中引用该显示消息组件,
 */

// ……
import store from '@/portal/store'
import {
  Message,
  MessageBox,
  Notification,
  Loading
} from 'element-ui'

let instances = []  // 消息实例列表

/**
 * 通用消息处理
 * @param {*} options
 * @param {*} messageType
 */
const MyMessage = function (options = { msgCode: null }, messageType = 'message') {
  // debugger
  let instance = null, // 消息实例
    modules = null,   // 模块名称
    msgCode = options.msgCode,   // 消息代号
    defaultMsg = this.$t('MyMessage.defaultErrorInfo'),   // 默认信息
    duration = 3000         // 自动消失时间

  const defaultOptions = {
    // global
    customClass:'custom-message',
    type: 'error',
    showClose: true,
    duration: 0,
    // MessageBox
    closeOnClickModal: false,
    closeOnPressEscape: false,
    showCancelButton: true,
    cancelButtonText: this.$t('MyMessage.cancelButtonText'),
    confirmButtonText: this.$t('MyMessage.confirmButtonText')
  }

  options = {
    ...defaultOptions,
    ...options
  }

  const onCloseFn = options.onClose // 原关闭消息回调方法

  // 设置关闭回调方法
  options.onClose = function(instance) {
    if (messageType != 'messagebox') {
      for (let i = 0, len = instances.length; i < len; i++) {
        if (instance.id === instances[i].id) {
          instances.splice(i, 1)
          break
        }
      }
      // 隐藏遮罩层
      if (instances.length == 0) {
        store.dispatch('setPageMask', false)
      }
    }

    // 页面回调
    if (typeof onCloseFn == 'function') {
      onCloseFn(instance)
    }
  }

  // MessageBox 关闭前的回调
  if (messageType === 'messagebox') {
    const beforeCloseFn = options.beforeClose

    // 设置关闭回调方法
    options.beforeClose = function(action, instance, done) {
      // 页面回调
      if (typeof beforeCloseFn === 'function') {
        beforeCloseFn.call(this, action, instance, done)
      } else {
        done()
      }
    }
  }

  // 加入实例列表
  const addInstances = function(instance) {
    if (options.duration == 0) {
      instances.push(instance)
    }
  }

  // 显示遮罩层 mask
  const showMask = function() {
    if (options.duration == 0) {
      store.dispatch('setPageMask', true)
    }
  }

  // debugger
  // 显示信息框
  const showMessage = function(options) {
    // 默认显示文字
    if (! options.message)
      options.message = defaultMsg

    // 非弹框的success类型默认自动隐藏
    if (messageType != 'messagebox' && options.type == 'success' && options.duration == 0)
      options.duration = duration
      
      
    // 构造消息内容
    const h = this.$createElement
    const showMoreText = this.$t('MyMessage.showMoreText')
    options.message = h('message-content', {props:{options:{messageType, msgCode:options.msgCode, message:options.message, defaultMsg, showMoreText}}})

    // if (msgCode == 'ISC-999') { // 显示更多
    //   const showMoreText = this.$t('MyMessage.showMoreText')

    //   options.duration = 0
    //   options.message = h('div', { class:'message-box' }, [
    //     h('p', { class:'title' }, [
    //       h('span', { class:'code' }, "ISC-999："),
    //       h('span', null, defaultMsg)
    //     ]),
    //     h('p', { class:'more-box' }, [
    //       h('a', { class:'show-more', on: {click:showMore} }, showMoreText)
    //     ]),
    //     h('el-scrollbar', { style:{display:'none'}, props:{native:false, noresize:false, wrapClass:'scroll-message'} }, options.message)
    //   ])
    // } else {
    //   // messagebox 拖曳指令
    //   const directives = messageType === 'messagebox' ? [{ name: 'dialog-drag', value: { moveHeader: '.title', moveBox: '.custom-message' }}] : []

    //   options.message = h('div', { class:'message-box', directives }, [
    //     h('p', { class:'title' }, [
    //       h('span', { class:'code' }, options.msgCode ? (options.msgCode+'：'):''),
    //       h('span', null, options.message)
    //     ])
    //   ])
    // }

    // 兼容处理
    if (options.type == 'warn') {
      options.type = 'warning'
    }
    switch (messageType) {
      case 'message': // 消息提示
        showMask()
        instance = Message(options)
        addInstances(instance)
        break;
      case 'messagebox': // 弹框
        instance = MessageBox(options)
        break;
      default: // 通知
        showMask()
        instance = Notification(options)
        addInstances(instance)
    }
  }

  // 显示更多信息
  const showMore = function(event) {
    const scroll = event.target.parentNode.parentNode.querySelector('.el-scrollbar')
    scroll.style.display = scroll.style.display == 'none'  ? 'block':'none'
  }

  // 字符串格式化替换
  const formatStr = function(str, params = '') {
    if (str === '') return ''
    if (params === '') return str

    let i=0
      params = params.replace(/(^\s*)|(\s*$)/g, '').split(',')

    const newStr = str.replace(/%s/gi, function(){
      let replace = params[i] || ''
      i++
      return replace
    })

    return newStr
  }

  // ISC-999 信息直接显示
  if (msgCode == 'ISC-999') {
    showMessage.call(this, options)
    return
  }

  if (msgCode) modules = msgCode.split('-')[0]

  if (modules) {
    this.$store.dispatch('getModuleMessage', {
      modules,
      msgCode
    }).then(msg => {
      // if (msgCode == 'ISC-912') {
      //   options.message = '{"errorCode":"ISC-912","errorMsg":"Invalid Token:8787ef4f-ac41-4e4a-bf78-3197d9ec2a03","params":"this is a format test., Invalid Token"}'
      //   msg = '%s %s:8787ef4f-ac41-4e4a-bf78-3197d9ec2a03'
      // }
      if (msg) {
        let formatMsg = options.message   // 用于格式化信息处理

        // options.message = msg
        options.message = msg.msgContent

        try {
          formatMsg = JSON.parse(formatMsg)
          if (Object.prototype.toString.call(formatMsg) == '[object Object]') {
            let formatParams = formatMsg.params   // 格式化信息值
            options.message = formatStr(options.message, formatParams)
          }
        } catch (e) {}

        msg.type && (options.type = msg.type)
        // 消息框自动关闭设置
        if (messageType != 'messagebox' && ! options.duration && msg.autoDisappear == 'N') {
          options.duration = 0
        } else {
          options.duration = duration
        }
      } else {
        // messageType = 'Notification'
        // options.duration = duration
        if (Object.prototype.toString.call(options.message) == '[object Object]') {
          options.message = options.message.errorMsg
        } else {
          try {
            let parseMsg = JSON.parse(options.message)
            options.message = parseMsg.errorMsg
          } catch (e) {}
        }
      }
      showMessage.call(this, options)
    })
  } else {
    showMessage.call(this, options)
  }

  return instance
}

export default MyMessage
// ……