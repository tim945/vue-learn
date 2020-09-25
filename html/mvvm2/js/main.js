/*
 * @Author: tim
 * @Date: 2020-09-25 17:27:55
 * @LastEditors: tim
 * @LastEditTime: 2020-09-25 18:12:07
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
      console.log(this.$data, this.$data.message)
      // 编译页面
      // new Complier(this.$el, this);
    }
  }
}