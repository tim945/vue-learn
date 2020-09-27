/*
 * @Author: tim
 * @Date: 2020-09-25 17:32:27
 * @LastEditors: tim
 * @LastEditTime: 2020-09-27 15:13:23
 * @Description: 数据观察
 */
class Observer {
  constructor(data) {
    this.observer(data);
  }
  observer(data) {
    if (!data || typeof data !== 'object') {
      return false;
    } else {
      // 劫持data
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key]);
      })      
    }
  }
  defineReactive(obj, key, value) {
    let self = this;
    let dep = new Dependency();   // 每个属性的订阅者

    this.observer(value);

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get() {
        debugger
        if (Dependency.target) {
          dep.addSub(Dependency.target);   // 添加订阅者watcher  <--- 应该是整个实例Watcher
        }
        return value;
      },
      set(newValue) {
        debugger
        // 值未变化return回去
        if (newValue === value) { return false; }
        value = newValue; // <--- 更新为最新的值
        self.observer(newValue);  // 监听新值
        dep.notify();
      }
    })   
  }
  
}

// 第一次get值的时候不会添加Watcher到Dependency,实例化（调用）watcher时再添加
Dependency.target = null;