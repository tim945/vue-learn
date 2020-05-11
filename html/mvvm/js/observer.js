/*
 * @Author: tim
 * @Date: 2020-04-14 17:08:06
 * @LastEditors: tim
 * @LastEditTime: 2020-05-11 18:02:09
 * @Description: 数据的观察者，让数据对象的读写操作都处于自己的监管之下。当初始化实例的时候，会递归遍历data，用Object.defineProperty来拦截数据（包含数组里的每个数据）
 */
class Observer {
  constructor(data) {
    this.observer(data);
  }
  observer(data) {
    if (!data || typeof data !== 'object') {
      return false;
    } else {
      Object.keys(data).forEach((key) => {
        // 劫持data对象中的每一条数据
        this.defineReactive(data, key, data[key]);
      })
    }
  }
  defineReactive(obj, key, value) {
    let dep = new Dependency(); // 每个属性的所有订阅者
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get() {
        if (Dependency.target) {  // JS的浏览器单线程特性，保证这个全局变量在同一时间内，只会有同一个监听器使用
          dep.addSub(Dependency.target);    // 添加订阅者watcher,应该是整个实例Watcher
        }
        return value;
      },
      set(newValue) {
        // 值未变化return回去
        if (newValue === value) { return false; }
        value = newValue; // 更新为最新的值
        // 数据变化，通知dep里所有的watcher
        dep.notify();
      }
    })
  }
}
 // 第一次get值的时候不会添加Watcher到Dependency,实例化（调用）watcher时再添加
Dependency.target = null;