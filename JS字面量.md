<!--
 * @Author: tim
 * @Date: 2020-03-02 10:58:40
 * @LastEditors: tim
 * @LastEditTime: 2020-03-02 11:08:44
 * @Description: 
 -->
1.什么是字面量？
就是不用js的new操作符创建实例。

2.字面量分类：字符串、数组、对象、 函数

3.什么是对象字面量？

``` js
var obj = {
a:'aaa',//a是属性，'aaa'是属性值
b:'bbb',
c:'ccc'
}
obj.a//"aaa"
obj['a']//"aaa"
```

4.js标准创建对象的方式要用new

``` js
var obj=new Object()
obj.a='aaa';
obj.b='bbb'
obj.c='ccc'

obj.c//"ccc"
obj['c']//"ccc"
``` 

5.为什么说对象字面量赋值比new Object()高效？
{}是字面量，可以立即求值，而new Object()本质上是方法（只不过这个方法是内置的）调用，既然是方法调用，
就涉及到在proto链中遍历该方法，当找到该方法后，又会生产方法调用必须的堆栈信息，方法调用结束后，还要释放该堆栈
