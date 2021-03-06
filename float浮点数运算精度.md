<!--
 * @Author: tim
 * @Date: 2020-07-02 10:32:07
 * @LastEditors: tim
 * @LastEditTime: 2020-09-30 10:18:35
 * @Description: http://www.ruanyifeng.com/blog/2010/06/ieee_floating-point_representation.html 浮点数的二进制表示
--> 
# 浮点数运算精度丢失
> 浮点数运算精度丢失问题并不是js独有的！
> js浮点数的加减乘除运算都可能导致精度丢失问题！

``` js
0.1 + 0.2 =  0.30000000000000004
2.07 - 1 = 1.0699999999999998
1 - 0.9 = 0.09999999999999998
0.57 * 100 = 56.99999999999999
```

任何数在计算机面前都会被处理成二进制，而数字的二进制表示主要有原码、反码、补码。
JavaScript 存储小数，和其它语言如 Java 和 Python 不同，JavaScript 中所有数字包括整数和小数都只有一种类型 — Number。
它的实现遵循 IEEE 754 标准，使用 64 位固定长度来表示，也就是标准的 double 双精度浮点数（相关的还有float 32位单精度）。

::: tip
浮点数运算JS库：https://github.com/nefe/number-precision
:::