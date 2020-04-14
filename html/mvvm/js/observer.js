/*
 * @Author: tim
 * @Date: 2020-04-14 17:08:06
 * @LastEditors: tim
 * @LastEditTime: 2020-04-14 17:18:40
 * @Description: 
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
    let dep = new Dependency();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get() {
        if (Dependency.target) {
          dep.addSub(Dependency.target);    // 添加订阅者watcher,应该是整个实例Watcher
        }
        return value;
      },
      set(newValue) {
        // 值未变化return回去
        if (newValue === value) { return false; }
        value = newValue;
        // 数据变化，通知dep里所有的watcher
        dep.notify();
      }
    })
  }
}
 // 第一次get值的时候不会添加Watcher到Dependency,实例化（调用）watcher时再添加
Dependency.target = null;