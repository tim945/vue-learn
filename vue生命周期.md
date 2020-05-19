<!--
 * @Author: tim
 * @Date: 2020-05-19 11:04:22
 * @LastEditors: tim
 * @LastEditTime: 2020-05-19 11:05:15
 * @Description: 
--> 

# vue生命周期
> vue的生命周期：beforeCreate created beforeMount mounted beforeDestory destoryed beforeUpdate updated

父组件和子组件钩子执行顺序

加载渲染过程：父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted

父组件挂载完毕肯定是等里面的子组件都挂载完毕后才算父组件挂载完毕了，所以父组件的mounted在最后。

子组件更新过程(子组件更新影响到父组件的情况)：父beforeUpdate -> 子beforeUpdate->子updated -> 父updted

子组件更新过程(子组件更新不影响父组件的情况)：子beforeUpdate -> 子updated

父组件更新过程(父组件影响子组件的情况)：父beforeUpdate -> 子beforeUpdate->子updated -> 父updted

父组件更新过程(父组件不影响子组件的情况)：父beforeUpdate -> 父updated

销毁过程：父beforeDestroy->子beforeDestroy->子destroyed->父destroyed