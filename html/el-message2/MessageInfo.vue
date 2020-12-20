<!--
 * @Author: tim
 * @Date: 2020-10-14 10:00:43
 * @LastEditors: tim
 * @LastEditTime: 2020-10-14 14:14:19
 * @Description: 
-->
<script>
export default {
  name: 'MessageInfo',
  // 函数式组件：无状态 (没有响应式数据)，也没有实例 (没有 this 上下文)
  functional: true, 
  props: {
    message: {
      type: [Array, String],
      default: function () {
        return ''
      }
    }    
  },
  render(h, context) {
    // debugger 渲染时会执行多次？
    const { message } = context.props
    const isVnodes = Object.prototype.toString.call(message) == "[object Array]"
    return isVnodes ? message:h('span', {domProps: {innerHTML: message}})
  },  
  methods: {
    
  },
  watch: {
    message:function(n, o) {
      console.log(n, o)
    }
  },
  mounted() {
    debugger
  }
}
</script>