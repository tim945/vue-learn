<!--
 * @Author: tim
 * @Date: 2020-05-12 17:40:16
 * @LastEditors: tim
 * @LastEditTime: 2020-05-12 17:42:30
 * @Description: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE
 -->

# js新特性-可选链（?.）

``` js
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah'
  }
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// expected output: undefined

console.log(adventurer.someNonExistentMethod?.());
// expected output: undefined

```