``` css
/* 滚动容器 */
.el-scroll {
  height: 100%;
  /* begin fix code @chrome 70 页面滚动问题 */
  min-height: 0;
  display: flex;
  flex-direction: column;
  /* end fix code*/
  .scrollY {
    overflow-x: hidden;
  }
}
```