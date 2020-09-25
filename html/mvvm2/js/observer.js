/*
 * @Author: tim
 * @Date: 2020-09-25 17:32:27
 * @LastEditors: tim
 * @LastEditTime: 2020-09-25 18:05:37
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
    debugger
    let self = this;

    this.observer(value);

    obj = new Proxy(obj, {
      get(target, key) {
        console.log('get', value)
        return value;
      },
      set(target, key, newValue) {
        if (newValue === value) return false;
        // value = newValue; // 更新值
        self.observer(newValue);  // 新的值是object的话，进行监听
        console.log('set', newValue)
        return Reflect.set(target, key, value);
      }
    })
  }
}

// 第一次get值的时候不会添加Watcher到Dependency,实例化（调用）watcher时再添加
// Dependency.target = null;