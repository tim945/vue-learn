<!--
 * @Author: tim
 * @Date: 2020-10-23 09:52:09
 * @LastEditors: tim
 * @LastEditTime: 2020-10-26 16:36:57
 * @Description: 
-->
# 未来的函数：生成器和promise

* 通过生成器让函数持续执行
* 使用promise处理异步任务
* 使用生成器和promise书写优雅代码

> 生成器（generator） 函数能生成一组值的序列， 但每个值的生成是基于每次请求， 并不同于标准函数那样立即生成。我们必须显式地向生成器请求一个新的值， 随后生成器要么响应一个新生成的值， 要么就告诉我们它之后都不会再生成新值。更让人好奇的是， 每当生成器函数生成了一个值， 它都不会像普通函数一样停止执行。相反， 生成器几乎从不挂起。 随后， 当对另一个值的请求到来后， 生成器就会从上次离开的位置恢复执行。 

## 生成器函数

![生成器函数](./imgs/generator生成器.png)

``` js
function* WeaponGenerator() { 
  yield "Katana";
  yield "Wakizashi";
  yield "Kusarigama";
} 
for (let weapon of WeaponGenerator()) {
	console.log(weapon)
}

// iterator 迭代器
var res = WeaponGenerator();

// 调用迭代器的next方法向生成器请求一个新值
res.next()  // {value: "Wakizashi", done: false}

// 使用while循环迭代生成器结
var item;
while ( !(item=g.next()).done ) {
	console.log(item)
}

// 把执行权交给下一个生成器
function* WarriorGenerator(){
    yield "Sun Tzu";
    yield* NinjaGenerator(); 
    yield "Genghis Khan";
} 

function* NinjaGenerator(){
    yield "Hattori";
    yield "Yoshi";
}
```

## next方法
> 调用Generator函数返回一个遍历器对象(迭代器)，代表Generator函数的内部指针。
> 以后每次调用遍历器对象的next()方法，就会返回一个有着value和done属性的对象，**value表示yield后的表达式的值**，done属性是一个布尔值，表示函数是否遍历结束。

[next()方法的运行逻辑]

* 遇到yield语句就暂停执行后面的语句，并将紧跟在yield后的表达式的值作为返回的对象的value属性值

* 下一次调用next()方法时，继续执行，直到遇到下一跳yield语句。

* 如果没有遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式值作为返回对象的value属性值。

* 如果该函数没有return语句，则返回对象value属性值为undefined。

``` js
function* generator() {
  console.log('a'); 
  yield 'hello';
  yield 'world';
  return 'ending';
}
var a = generator();
console.log( a.next() );
console.log( a.next() );
console.log( a.next() );
console.log( a.next() );

// 分析
// 第一次调用next()方法,Generator函数开始执行，直到遇到第一个yield语句为止。所以结果为: a {value:hello,done: false}

// 第二次调用，继续执行，遇到第二个yield语句，所以结果为：{value: world, done:false}

// 第三次调用，继续执行，遇到return语句，结果返回：{value: ending, done: true}

// 第四次调用，此时Generator函数执行完毕，next()返回的对象的value值为undefined，done属性为true。
```

## next()方法的参数
> yield语句没有返回值或者说返回值为undefined，但如果next()方法带有参数，则这个参数会被当做**上一条yield语句的返回值**。

``` js
function* foo(x) {
    var y = 2 * (yield(x + 1));
    var z = yield(y/3);
    return (x + y + z);
}
var a = foo(5);
// 无参数
// console.log(a.next());   // {value: 6, done: false}
// console.log(a.next());   // {value: NaN, done: false}
// console.log(a.next());   // {value: NaN, done: true}
// 有参数
console.log(a.next());    // {value: 6, done: false}
console.log(a.next(12));  // {value: 8, done: false}
console.log(a.next(13));  // {value: 42, done: true}
```

没有提供参数时，第二次调用next()，导致y的值为2*undefined（即NaN），第三次调用z为undefined，返回对象的value属性等于 5+NaN+undefined 为NaN。

提供参数时，第二次调用next()，导致y的值24，第三次调用，使得z的值为13，所有返回对象的value值为5+24+13=42

【注意】：*由于next()的参数表示上一条yield语句的返回值，所有第一次使用next方法时，传递的参数是无效的。*

## 使用生成器

``` js
// 使用生成器生成ID序列
function* IdGenerator() { // ⇽--- 定义生成器函数IdGenerator
    let id = 0; // ⇽--- 一个始终记录ID的变量， 这个变量无法在生成器外部改变
    while (true) {
    	yield ++id;
	} // ⇽--- 循环生成无限长度的ID序列
} 
const idIterator = IdGenerator(); //⇽--- 这个迭代器我们能够向生成器请求新的ID值

let id = idIterator.next().value; 
```

``` html
<div id="subTree">
  <form>
    <input type="text">
  </form>
  <p>Paragraph</p>
  <span>Span</span>
</div>
```

``` js
// 用生成器遍历DOM树
function* DomTraversal(element){
  console.log('start-')
  yield element;        // 遇到 yield，响应生成值dlement后，程序挂起，等待下一个next
  console.log('next-')  // 
  element = element.firstElementChild;
  while (element) {
    yield* DomTraversal(element); // ⇽--- 用yield将迭代控制转移到另一个Dom Traversal生成器实例上
    element = element.nextElementSibling;
  }
} 
const subTree = document.getElementById("subTree");
for(let element of DomTraversal(subTree)) {
  console.log(element !== null, element.nodeName);
} // ⇽--- 使用for-of对节点进行循环迭代
```

## 与生成器交互
> 向生成器发送值， 从而实现双向通信！ 使用生成器能够生成中间结果， 在生成器以外也能够使用该结果进行任何操作

``` js
function* NinjaGenerator(action) { // ⇽--- 生成器可以像其他函数一样接收标准参数
  const imposter = yield ("Hattori " + action); // ⇽--- 挂起的表达式。 产生一个值的同时， 生成器会返回一个中间计算结果。 通过带有参数的调用迭代器的next方法， 我们可以将数据传递回生成器
  assert(imposter === "Hanzo", "The generator has been infiltrated");
  yield ("Yoshi (" + imposter + ") " + action); // ⇽--- 传递回的值将成为yield表达式的返回值， 因此impostrer的值是Hanzo
} 

const ninjaIterator = NinjaGenerator("skulk"); // ⇽--- 普通的参数传递
const result1 = ninjaIterator.next();
assert(result1.value === "Hattori skulk","Hattori is skulking"); // ⇽---触发生成器的执行， 并检测返回值是否正确
const result2 = ninjaIterator.next("Hanzo");  // 通过next方法传入参数
assert(result2.value === "Yoshi (Hanzo) skulk","We have an imposter!"); //⇽--- 将数据作为next方法的参数传递给生成器， 并检测返回值是否符合预期
```

**使用next方法向生成器发送值**

![next方法传参](./imgs/next方法传参.png)

分析：这个例子中我们调用了两次ninjaIterator的next方法。 第一次调用ninjaIterator.next(), 请求了生成器的第一个值。 由于生成器还没开始执行， 这次调用则启动了生成器， 对表达式"Hattori " + action进行求值，得到了值"Hattori skulk"， 并将该生成器的执行挂起。第二次调用ninjaIterator的next方法则发生了有趣的事：ninjaIterator.next ("Hanzo")。 这一次， 我们使用next方法将计算得到的值又传递回生成器。 在生成器当前挂起的表达式 **yield ("Hattori "+ action)** 位置挂起， 故而值Hanzo作为参数传入了next()方法， 并用作整个yield表达式的值。 本例中， 也就是表示语句imposter = yield ("Hattori "+ action) 中的变量imposter最终值为Hanzo。

## 执行过程

* 挂起开始——创建了一个生成器后， 它最先以这种状态开始。 其中的任何代码都未执行。
* 执行——生成器中的代码执行的状态。 执行要么是刚开始， 要么是从上次挂起的时候继续的。 当生成器对应的迭代器调用了next方法， 并且当前存在可执行的代码时， 生成器都会转移到这个状态。
* 挂起让渡——当生成器在执行过程中遇到了一个yield表达式， 它会创建一个包含着返回值的新对象， 随后再挂起执行。 生成器在这个状态暂停并等待继续执行。
* 完成——在生成器执行期间， 如果代码执行到return语句或者全部代码执行完毕， 生成器就进入该状态。

![执行过程](./imgs/执行过程.png)

``` js
// 生成的重用
function* NinjaGenerator(action) {
  yield "Hattori " + action;
  return "Yoshi " + action;
}
var ninjaIterator = NinjaGenerator("skulk");
ninjaIterator.next(); // Hattori skulk
ninjaIterator.next(); // Yoshi skulk
```

**通过执行上下文跟踪生成器函数**

一般情况下， 当程序从一个标准函数返回后， 对应的执行环境上下文会从栈中弹出， 并被完整地销毁。  
但由于ninjaIterator还保存着对它的引用， 所以它不会被销毁。 你可以把它看作一种类似闭包的事物。  

![执行过程1](./imgs/生成器执行上下文1.png)

![执行过程2](./imgs/生成器执行上下文2.png)

![执行过程3](./imgs/生成器执行上下文3.png)


## 练习代码
* a1~a4的值是什么?
``` js
function *EvenGenerator(){
  let num = 2;
  while(true){
    yield num;
    num = num + 2;
  }
} 

let generator = EvenGenerator();
let a1 = generator.next().value;  // 2
let a2 = generator.next().value;  // 4
let a3 = EvenGenerator().next().value;  // 2
let a4 = generator.next().value //6
```

* ninjas 数组中的内容是什么？ （小提示： 思考一下 for-of 循环如何使用while循环来实现）
``` js
function* NinjaGenerator(){
  yield "Yoshi";
  return "Hattori";
  yield "Hanzo";
} 
var ninjas = [];for(let ninja of NinjaGenerator()){
  ninjas.push(ninja);
}
ninjas; // ["Yoshi"]
```

* 变量a1 和变量 a2的值是什么
``` js
function* Gen(val) {
  val = yield val * 2;
  yield val;
} 
let generator = Gen(2);
let a1 = generator.next(3).value; // 4
let a2 = generator.next(5).value; // 5
```
