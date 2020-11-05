<!--
 * @Author: tim
 * @Date: 2020-09-15 11:18:18
 * @LastEditors: tim
 * @LastEditTime: 2020-11-04 17:29:06
 * @Description: 
-->
# this 解析
> this 是在运行时进行绑定的， 并不是在编写时绑定， 它的上下文取决于函数调用时的各种条件。 
> this 的绑定和函数声明的位置没有任何关系， 只取决于函数的调用方式。
> 当一个函数被调用时， 会创建一个活动记录（有时候也称为执行上下文）。 这个记录会包含函数在哪里被调用（调用栈）、 函数的调用方法、 传入的参数等信息。 

## 调用栈与调用位置

``` js
function baz() {
  // 当前调用栈是： baz
  // 因此， 当前调用位置是全局作用域
  console.log( "baz" );
  bar(); // <-- bar 的调用位置
}
function bar() {
  // 当前调用栈是 baz -> bar
  // 因此， 当前调用位置在 baz 中
  console.log( "bar" );
  foo(); // <-- foo 的调用位置
}
function foo() {
  // 当前调用栈是 baz -> bar -> foo
  // 因此， 当前调用位置在 bar 中
  console.log( "foo" );
} 
baz(); // <-- baz 的调用位置
```

## this 绑定 
> 如果 this 的调用位置同时应用了多种绑定规则，它是有优先级的：new 绑定 -> 显示绑定 -> 隐式绑定 -> 默认绑定。

``` js
// 默认绑定
function foo() {
  console.log( this.a );
}
var a = 2;
foo(); // 2

// 如果使用严格模式（strict mode）， 那么全局对象将无法使用默认绑定， 因此 this 会绑定到 undefined：
function foo() {
  "use strict";
  console.log( this.a );
}
var a = 2;
foo(); // TypeError: this is undefined

// 只有 foo() 运行在非 strict mode 下时， 默认绑定才能绑定到全局对象； 严格模式下与foo()的调用位置无关：
function foo() {
  console.log( this.a );
}
var a = 2;
(function(){
  "use strict";
  foo(); // 2
})();
```

``` js
// obj.cool() 方法调用， this 指向obj
var obj = {
    id: "awesome",
    cool: function coolFn() {		
    	console.log( this.id );
	}
};
var id = "not awesome"
setTimeout( function() { obj.cool() }, 100 ); // awesome
```

``` js
// 指用 obj.cool，this指向 window
var obj = {
    id: "awesome",
    cool: function coolFn() {		
    	console.log( this.id );
	}
};
var id = "not awesome"
setTimeout( obj.cool, 100 ); // not awesome
```