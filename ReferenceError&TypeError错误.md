<!--
 * @Author: tim
 * @Date: 2020-09-29 11:06:48
 * @LastEditors: tim
 * @LastEditTime: 2020-09-29 11:15:57
 * @Description: 
-->
# ReferenceError错误
> 如果在所有嵌套的作用域中遍寻不到所需的变量，引擎会抛出ReferenceError错误，意味这，这是一个未声明的变量，这个错误是一个非常重要的异常类型。

``` js
console.log('a: ', a); // Uncaught ReferenceError: a is not defined
let a = 2;
```

# TypeError错误
> 这种错误表示作用域判别成功，但是进行了非法的操作，例如，对一个非函数类型的值进行函数调用，或者引用null、undefined类型的值中的属性，将会抛出TypeError异常错误。

``` js
let a = null; // 或者a = undefined
console.log(a.b); // Uncaught TypeError: Cannot read property 'b' of null

// 对一个非函数类型的值进行函数调用
let a = 2;
a(); // TypeError: a is not a function
```