<!--
 * @Author: tim
 * @Date: 2020-05-18 18:40:06
 * @LastEditors: tim
 * @LastEditTime: 2020-05-18 18:43:47
 * @Description: 
--> 

# Object.freeze()冻结一个对象
> Object.freeze()冻结的是值，所以仍然可以将变量的引用替换掉
> 当有大数据量的数组或Object，并且为纯数据展示不会修改，使用Object.freeze()可以让性能大幅提升

``` html
<p v-for="item in list">{{ item.value }}</p>
```

``` js
new Vue({
    data: {
        // vue不会对list里的object做getter、setter绑定
        list: Object.freeze([
            { value: 1 },
            { value: 2 }
        ])
    },
    created () {
        // 界面不会有响应
        this.list[0].value = 100;

        // 下面两种做法，界面都会响应
        this.list = [
            { value: 100 },
            { value: 200 }
        ];
        this.list = Object.freeze([
            { value: 100 },
            { value: 200 }
        ]);
    }
})
```
