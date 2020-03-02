``` css
/* 表头和内容不对齐问题fix */
.el-table th.gutter {
  width: 17px !important;
  display: table-cell !important;
}

.el-table {  
  /* 去除右侧 .gutter border */
  &.el-table--border th.gutter:last-of-type {
    border-bottom-width: 0;
  }
}
```
