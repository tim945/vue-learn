<!--
 * @Author: tim
 * @Date: 2020-09-15 11:18:18
 * @LastEditors: tim
 * @LastEditTime: 2020-09-29 14:35:49
 * @Description: 
-->
# this 解析

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