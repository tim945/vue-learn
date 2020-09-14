<!--
 * @Author: tim
 * @Date: 2020-09-14 17:28:48
 * @LastEditors: tim
 * @LastEditTime: 2020-09-14 17:35:24
 * @Description: 
-->
# LHS & RHS 左查询&右查询
> LHS - 赋值操作， RHS - 取值操作

换句话说， 当变量出现在赋值操作的左侧时进行 LHS 查询， 出现在右侧时进行 RHS 查询。
讲得更准确一点， RHS 查询与简单地查找某个变量的值别无二致， 而 LHS 查询则是试图
找到变量的容器本身， 从而可以对其赋值。 从这个角度说， RHS 并不是真正意义上的“赋
值操作的右侧”， 更准确地说是“非左侧”

::: tip
  不成功的 RHS 引用会导致抛出 ReferenceError 异常。 不成功的 LHS 引用会导致自动隐式
  地创建一个全局变量（非严格模式下）， 该变量使用 LHS 引用的目标作为标识符， 或者抛
  出 ReferenceError 异常（严格模式下）。
:::

``` js
function foo(a) {
  var b = a;
  return a + b;
}
var c = foo( 2 );

// 1. 找出所有的 LHS 查询（这里有 3 处！ ）
// c = ..;、 a = 2（隐式变量分配）、 b = ..
// 2. 找出所有的 RHS 查询（这里有 4 处！ ）
// foo(2..、 = a;、 a ..、 .. b

```