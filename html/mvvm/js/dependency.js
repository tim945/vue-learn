/*
 * @Author: tim
 * @Date: 2020-04-14 17:07:46
 * @LastEditors: tim
 * @LastEditTime: 2020-04-14 17:11:43
 * @Description: 容器
 */
class Dependency {
  constructor() {
    this.subs = [];      // 容器数据，放watcher用
  }
  addSub(watch) {
    this.subs.push(watch);   // 将watcher添加到subs内
  }
  notify() {
    // 通知subs内的所有watcher更新回调
    this.subs.forEach((watch) => {
      watch.update();
    })
  }
}