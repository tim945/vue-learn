<!--
 * @Author: tim
 * @Date: 2020-07-28 16:27:32
 * @LastEditors: tim
 * @LastEditTime: 2020-07-28 16:53:11
 * @Description: 
--> 
# 理解Vue中的computed,watch,methods的区别

1. computed是计算属性的，会根据所依赖的数据动态显示新的计算结果，该计算结果会被缓存起来。只有在响应式依赖发生改变时它们才会重新求值，应用场景有：

  a. 适用于一些重复使用数据或复杂及费时的运算。我们可以把它放入computed中进行计算, 然后会在computed中缓存起来, 下次就可以直接获取了。

  b. 如果我们需要的数据依赖于其他的数据的话, 我们可以把该数据设计为computed中。

2. methods不是响应式的，方法中是每次调用，都会执行函数的。

3. watch每次都需要执行函数。watch更适用于数据变化时的异步或开销较大的操作。 

