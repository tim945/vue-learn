<!--
 * @Author: tim
 * @Date: 2020-10-12 09:41:21
 * @LastEditors: tim
 * @LastEditTime: 2020-10-12 10:56:42
 * @Description: 
-->
# JS引擎执行过程
> javascript是单线程语言，js引擎执行过程分为三个阶段

1、语法分析
>分析该js脚本代码块的语法是否正确，如果出现不正确，则向外抛出一个`语法错误（SyntaxError）`，停止该js代码块的执行，然后继续查找并加载下一个代码块；如果语法正确，则进入预编译阶段

2、预编译阶段
> js代码块通过语法分析阶段后，语法正确则进入预编译阶段。

JS运行环境主要有三种：

* 全局环境（JS代码加载完毕后，进入代码预编译即进入全局环境）

* 函数环境（函数调用执行时，进入该函数环境，不同的函数则函数环境不同）

* eval（不建议使用，会有安全，性能等问题）

每进入一个不同的运行环境都会创建一个相应的`执行上下文（Execution Context）`，那么在一段JS程序中一般都会创建多个执行上下文，js引擎会以栈的方式对这些执行上下文进行处理，形成`函数调用栈（call stack）`，栈底永远是全局执行上下文（Global Execution Context），栈顶则永远是当前执行上下文。

函数调用栈 -> 创建执行上下文(1.创建变量对象（Variable Object）2.建立作用域链（Scope Chain）3.确定this的指向)

*`注意：`*
创建变量对象发生在预编译阶段，但尚未进入执行阶段，该变量对象都是不能访问的，因为此时的变量对象中的变量属性尚未赋值，值仍为undefined，只有进入执行阶段，变量对象中的变量属性进行赋值后，变量对象（Variable Object）转为活动对象（Active Object）后，才能进行访问，这个过程就是 `VO –> AO` 过程

3、执行阶段
``` js
var num = 30;

function test() {
    var a = 10;

    function innerTest() {
        var b = 20;

        return a + b
    }

    innerTest()
}

test()
```

当执行到调用innerTest函数，进入innerTest函数环境。全局执行上下文和test函数执行上下文已进入执行阶段，innerTest函数执行上下文在预编译阶段创建变量对象，所以他们的活动对象和变量对象分别是AO(global)，AO(test)和VO(innerTest)，而innerTest的作用域链由当前执行环境的变量对象（未进入执行阶段前）与上层环境的一系列活动对象组成，如下：

``` js
innerTestEC = {

    //变量对象
    VO: {b: undefined}, 

    //作用域链(这里使用数组表示作用域链，作用域链的活动对象或变量对象可以直接理解为作用域)
    scopeChain: [VO(innerTest), AO(test), AO(global)],  
    
    //this指向
    this: window
```