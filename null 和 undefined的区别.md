<!--
 * @Author: tim
 * @Date: 2020-06-24 18:04:13
 * @LastEditors: tim
 * @LastEditTime: 2020-09-04 16:45:28
 * @Description: 
-->
1. 首先看一个判断题：null和undefined 是否相等
    console.log(null==undefined)//true
    console.log(null===undefined)//false
观察可以发现：null和undefined 两者相等，但是当两者做全等比较时，两者又不等。

原因：

　　  null： object类型，代表“空值”，代表一个空对象指针，

      undefined： undefined类型，
 

2. 那到底什么时候是null,什么时候是undefined呢？
   null表示"没有对象"，即该处不应该有值。典型用法是：

（1） 作为函数的参数，表示该函数的参数不是对象。

（2） 作为对象原型链的终点。

undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：

（1）变量被声明了，但没有赋值时，就等于undefined。 例如，

（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。

（3）对象没有赋值的属性，该属性的值为undefined。

（4）函数没有返回值时或者return后面什么也没有，返回undefined。

3. null 与 undefined 比较

```js 
null == undefined;  // true
null === undefined; // false

// 对于其他比较，它们会先转换位数字：null 转换为 0 ， undefied 转换为 NaN 。
// undefined 和 null 在相等性检查 == 中「不会进行任何的类型转换」，它们有自己独立的比较规则，所以除了它们之间互等外，不会等于任何其他的值。

null > 0;  // false 1
null >= 0; // true  2
null == 0; // false 3
null < 1;  // true  4

undefined > 0;  // false  1
undefined > 1;  // false  2
undefined == 0; // false  3

```
4. 会被转换为 false 的表达式有
null undefined NaN 0 空字符串（"" or '' or ````）