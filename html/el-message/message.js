/*
 * @Author: tim
 * @Date: 2020-08-17 13:20:35
 * @LastEditors: tim
 * @LastEditTime: 2020-08-17 13:39:29
 * @Description: message 消息统一处理  整合 elementUI 中的 Message 消息提示、MessageBox 弹框、Notification 通知
 */

// 提示消息内容增加 html 支持

/**
 * 修改步骤：
 * 1. 在 main.js 全局注册消息内容渲染组件 
 * import RenderNode from './renderNode'
 * Vue.component('RenderNode', RenderNode)
 * 
 * 2. 在原封装的消息库中引用该显示消息组件,
 */

// ……
options.message = h('div', { class:'message-box', directives }, [
  h('p', { class:'title' }, [
    h('span', { class:'code' }, options.msgCode ? (options.msgCode+'：'):''),
    // h('span', null, options.message)
    h('render-node', {domProps: {innerHTML:options.message}})   // <-------------- 引用组件
  ])
])
// ……