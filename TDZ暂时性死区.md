<!--
 * @Author: tim
 * @Date: 2020-09-14 15:21:19
 * @LastEditors: tim
 * @LastEditTime: 2020-11-24 13:49:10
 * @Description: 
-->
# TDZ暂时性死区
> TDZ（Temporal Dead Zone）指的是由于代码中的变量还没有初始化而不能被引用的情况。
> 
最直观的例子是 ES6 规范中的 let 块作用域：

``` js
// a = 2 试图在 let a 初始化 a 之前使用该变量（其作用域在 { .. } 内），这里就是 a 的TDZ，会产生错误。
{
  a = 2; // ReferenceError!
  let a;
}

// 有意思的是，对未声明变量使用 typeof 不会产生错误，但在 TDZ 中却会报错：
{
  typeof a; // undefined
  typeof b; // ReferenceError! (TDZ)
  let b;
}
```

> var是在距离最近的函数或全局词法环境中定义变量，let和const直接在最近的词法环境中定义变量（可以是在块级作用域内、 循环内、 函数内或全局环境内） 
