/*
 * @Author: tim
 * @Date: 2020-04-14 17:07:46
 * @LastEditors: tim
 * @LastEditTime: 2020-05-11 18:02:16
 * @Description: 数据更新的发布者, get数据的时候，收集订阅者，触发Watcher的依赖收集；set数据时发布更新，通知Watcher 
 */
class Dependency {
  constructor() {
    this.subs = [];      // 容器数据，放watcher用
  }
  // 订阅器添加订阅者
  addSub(watch) {
    this.subs.push(watch);   // 将watcher添加到subs内
  }
  // 通知subs内的所有watcher更新回调
  notify() {
    this.subs.forEach((watch) => {
      watch.update();
    })
  }
}