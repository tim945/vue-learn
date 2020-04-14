/*
 * @Author: tim
 * @Date: 2020-04-14 17:07:23
 * @LastEditors: tim
 * @LastEditTime: 2020-04-14 17:32:45
 * @Description: 
 */
class MVVM {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    // 当视图存在时
    if (this.$el) {
      // 将属性添加进Observer，劫持数据
      new Observer(this.$data);
      // 编译页面
      new Complier(this.$el, this);
    }
  }
}