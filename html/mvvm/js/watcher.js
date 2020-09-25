/*
 * @Author: tim
 * @Date: 2020-04-14 17:08:25
 * @LastEditors: tim
 * @LastEditTime: 2020-09-25 17:15:57
 * @Description: 数据更新的订阅者，订阅的数据改变时执行相应的回调函数（更新视图或表达式的值）。
 */
class Watcher {
  constructor(vm, expr, callback) {
    this.vm = vm;
    this.expr = expr;           // data中的key值
    this.callback = callback;   // 值变化的时候执行什么回调
    this.value = this.get();    // 获取当前值   <---- 实例化watcher的时候将自己添加到Dependency 
  }
  get() {
    debugger
    Dependency.target = this;   // 缓存自己,就是这个Watcher实例
    let value = this.vm.$data[this.expr];  // 获取属性值   <--- 触发执行Observer中的get函数，将自己添加到Dep
    Dependency.target = null;   // 释放自己
    return value;
  }
  update() {
    debugger
    // 值更新后，Observer的setter就会触发，就会执行dep.notify()，即通过Dep容器通知watcher根据callback【更新视图】
    let newValue = this.vm.$data[this.expr];
    let oldValue = this.value;
    if (newValue !== oldValue) {
      // 新老值不一致，执行回调
      this.callback(newValue);
    }
  }
}