<!--
 * @Author: tim
 * @Date: 2020-03-02 10:58:40
 * @LastEditors: tim
 * @LastEditTime: 2020-03-02 11:18:35
 * @Description: 
 -->
``` html
<el-form-item :label="$t('code')" :error="validate(form)" prop="code">
  <el-input v-model.trim="form.code" @keyup.enter.native="search"></el-input>
</el-form-item>
</template>
``` 

``` js
// 返回非空时显示报错
validate (from) {
  if (! this.isSubmit) return ''

  this.isValidate = false

  for(let item in this.searchField) {
    if (this.form[item]) {
      this.isValidate = true
      return ''
    }
  }

  return 'invalid'        
},
// 执行查询 
search() { 
  // nextTick 待表单项验证后执行
  this.$nextTick(function(){
    if (! this.isValidate) return
    this.queryData()
  })
},
```