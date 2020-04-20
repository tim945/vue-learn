<!--
 * @Author: tim
 * @Date: 2020-04-20 18:12:07
 * @LastEditors: tim
 * @LastEditTime: 2020-04-20 18:14:44
 * @Description: 
 -->
# el-input-number 设置默认空值

``` html
<el-input-number v-model="num" controls-position="right" :min="1"></el-input-number>
```

``` js
data() {
  return {
    num: undefined
  }
}
```