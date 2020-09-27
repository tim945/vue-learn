/*
 * @Author: tim
 * @Date: 2020-09-27 13:50:46
 * @LastEditors: tim
 * @LastEditTime: 2020-09-27 14:13:11
 * @Description: 收集订阅者，触发Watcher的依赖收集；set数据时发布更新，通知Watcher 
 */
class Dependency {
  constructor() {
    this.subs = []; // 收集watcher
  }
  // 添加订阅
  addSub(watch) {
    this.subs.push(watch);
  }
  // 通知watcher更新回调
  notify() {
    this.subs.forEach(watch => {
      watch.update();
    })
  }
}