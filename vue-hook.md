<!--
 * @Author: tim
 * @Date: 2020-04-03 14:11:03
 * @LastEditors: tim
 * @LastEditTime: 2020-04-03 14:14:10
 * @Description: 
 -->

# $on('hook:')
> 如果要在created或mounted方法中定义自定义事件侦听器或第三方插件，并且需要在beforeDestroy方法中将其删除以免引起任何内存泄漏，则可以使用此功能。 使用$on(‘hook:’)方法，我们可以仅使用一种生命周期方法（而不是两种）来定义/删除事件。 
 
 ``` js
mounted() {    
    this.$on("hook:beforeDestroy", () => {
      console.log('111')  // 后执行
    })
  },
  beforeDestroy() {
    console.log('222')  // 先执行
  }
 ```
