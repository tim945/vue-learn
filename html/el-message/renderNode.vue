<!--
 * @Author: tim
 * @Date: 2020-08-17 13:19:03
 * @LastEditors: tim
 * @LastEditTime: 2020-08-17 13:25:00
 * @Description: 
-->
<script>
export default {
  render() {
    return (
      <div class="blue">
        <slot>0000</slot>
      </div>
    )
  }
}
</script>

<style scoped>
.blue {
  color: blue;
}
</style>