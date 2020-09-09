/*
 * @Author: tim
 * @Date: 2020-07-28 14:04:10
 * @LastEditors: tim
 * @LastEditTime: 2020-09-09 09:29:05
 * @Description: 全局-发布订阅模式对象的封装代码 https://www.cnblogs.com/tugenhua0707/p/4687947.html
 * 发布订阅（Publish/Subscriber）模式使用了一个 主题/事件通道对象，管理  主题和事件
 * Publish：发布者，发布通知 （通知 主题/事件通道对象  这个主题变化了，执行对应的事件)
 * Subscriber：订阅者，注册主题，和事件（ 告诉 主题/事件通道对象，这个主题变换，对应执行事件)
 */

var Event = (function () {
  var list = {},
    listen,
    trigger,
    remove;

  // 订阅消息
  listen = function (key, fn) {
    if (!list[key]) {
      list[key] = [];
    }
    list[key].push(fn);
  };
  // 发布消息
  trigger = function () {
    // key 第一个参数
    var key = Array.prototype.shift.call(arguments),  // 此处使用shift从arguments中删除第一个参数并返回删除的参数
      fns = list[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (var i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments);
    }
  };
  // 取消订阅
  remove = function (key, fn) {
    var fns = list[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var i = fns.length - 1; i >= 0; i--) {
        var _fn = fns[i];
        if (_fn === fn) {
          fns.splice(i, 1);
        }
      }
    }
  };
  return {
    listen: listen,
    trigger: trigger,
    remove: remove,
  };
})();
