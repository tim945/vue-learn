1、首先看一个判断题：null和undefined 是否相等
    console.log(null==undefined)//true
    console.log(null===undefined)//false
观察可以发现：null和undefined 两者相等，但是当两者做全等比较时，两者又不等。

原因：

　　  null： object类型，代表“空值”，代表一个空对象指针，

      undefined： undefined类型，
 

2、那到底什么时候是null,什么时候是undefined呢？
   null表示"没有对象"，即该处不应该有值。典型用法是：

（1） 作为函数的参数，表示该函数的参数不是对象。

（2） 作为对象原型链的终点。

undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：

（1）变量被声明了，但没有赋值时，就等于undefined。 例如，

（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。

（3）对象没有赋值的属性，该属性的值为undefined。

（4）函数没有返回值时或者return后面什么也没有，返回undefined。
