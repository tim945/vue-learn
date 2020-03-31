<!--
 * @Author: tim
 * @Date: 2020-03-31 15:32:15
 * @LastEditors: tim
 * @LastEditTime: 2020-03-31 15:40:18
 * @Description: 
 -->
# el-dialog 遮罩转页面(tab切换)场景设置
> 在当前标签页面显示 el-dialog 弹层&遮罩效果（只有弹层上的界面可以操作），点击按钮打开新的tab页面，可切换回弹层所在页面

``` html
<!--弹出编辑框-->
<!-- 此处若启用ESC关闭，跳转到[代替品], 在其他页面按ESC会先关闭该窗口 -->
<el-dialog
  v-if="dialogVisible"
  :title="dialogTitle"
  :visible.sync="dialogVisible"
  :modal="false"
  :modal-append-to-body="false"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  width="980px"
>
  <component-page
    :visible.sync="dialogVisible"
    :editData="currentRow"
  />
</el-dialog>
<!--弹出编辑框end-->
```

``` css
.el-dialog__wrapper {
  background: rgba(0, 0, 0, 0.5);
}
```
