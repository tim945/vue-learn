<!--
 * @Author: tim
 * @Date: 2020-05-09 17:02:38
 * @LastEditors: tim
 * @LastEditTime: 2020-11-23 10:18:06
 * @Description: 
 -->

# js数组去重

## Set

``` js
let arr = [1,1,2,2,3,4,5,5,6,7,7,8,9,9,'1'];
let newArr = [...new Set(arr)];
console.log(newArr);  // [1, 2, 3, 4, 5, 6, 7, 8, 9, "1"]
```

## filter

``` js
let arr = [1,1,2,2,3,4,5,5,6,7,7,8,9,9,'1'];
let newArr = arr.filter((v, index, arr) => {
  // 当前元素，在原始数组中的第一个索引==当前索引值
  return arr.indexOf(v, 0) === index
})
console.log(newArr);  // [1, 2, 3, 4, 5, 6, 7, 8, 9, "1"]
```

## reducer

``` js
let arr = [1,1,2,2,3,4,5,5,6,7,7,8,9,9,'1'];
let newArr = arr.reduce(function (prev, cur) {
  !prev.includes(cur) && prev.push(cur);
  return prev;
},[]);
console.log(newArr);  // [1, 2, 3, 4, 5, 6, 7, 8, 9, "1"]

// 求数组之和
let arr = [1,1,2,2,3,4,5,5,6,7,7,8,9,9,0];
let sum = arr.reduce((prev, cur) => {
  return prev + cur
}, 0)

// 求最大值
let arr = [1,1,2,2,3,4,5,5,6,7,7,8,9,9,0];
let max = arr.reduce((prev, cur) => {
  return Math.max(prev, cur)
})

Math.max.apply(null, arr)

// 数组扁平化
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]

Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b})

[...new Set(arr.flat(Infinity))].sort((a,b)=>{ return a-b})

arr.toString().split(",").sort((a,b)=>{ return a-b}).map(Number)


// 用reduce实现map的功能
Array.prototype.map = function (callback) {
    var arr = this;
    return arr.reduce((acc, cur, i) => {
        acc.push(callback(cur, i, arr));  // 将callback执行结果push入数组
        return acc
    }, []);
}
var m = [1,2,3,4,54].map(function (v, i, arr) {
    return v * v
});
console.log(m)

```

