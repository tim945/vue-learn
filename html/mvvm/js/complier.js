/*
 * @Author: tim
 * @Date: 2020-04-14 17:08:43
 * @LastEditors: tim
 * @LastEditTime: 2020-09-25 17:08:59
 * @Description: 解析器
 */
class Complier {
  constructor(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    if (this.el) {
      // 使用fragment储存元素，这时候#app内就没有节点了，因为已经被frag删除完了
      let fragment = this.nodeToFragment(this.el);   
      this.complie(fragment);                         // 编译fragment
      this.el.appendChild(fragment);                  // 将fragment放回#app内
    }
  }
  complie(node) {
    debugger
    // 使用Array.from将类数组node.childNodes转换为真正的数组
    let nodeList = Array.from(node.childNodes);    // 些处只做一层子节点处理
    nodeList.forEach((item) => {
      //根据nodeType判读节点类型，执行不同的编译
      switch (item.nodeType) {
        case 1: // 元素
          this.elementComplier(item);break;
        case 3: // 文本
          this.textComplier(item);break;
      }
    })
  }
  elementComplier(node) {
    // 元素节点编译器，处理属性v-model，v-text等
    let attrs = Array.from(node.attributes);
    attrs.forEach((attr) => {
      if (attr.name.indexOf('v-') > -1) {
        let type = attr.name.split('-')[1];    // 取到'model',即指令的类型
        complierUnits[type] && complierUnits[type](node, this.vm, attr.value);  // attr.value:v-model的表达式
      }
    })
  }
  textComplier(node) {
    // 文本节点编译器{{message}},跟v-text共用一个编译方法
    if ((/\{\{(.+)\}\}/).test(node.textContent)) {
      complierUnits.text(node, this.vm, RegExp.$1);
    }
  }
  nodeToFragment(node) {
    // 将node转换为fragment
    let frag = document.createDocumentFragment();
    let child;
    while (child = node.firstChild) {
      // fragment调用appendChild方法会删除node.firstChild节点，页面上的节点会被删除
      frag.appendChild(child);
    }
    return frag;
  }
}

// 编译器工具箱，只对页面上绑定的数据表达式进行 Watcher
const complierUnits = {
  model (node, vm, expr) {
    let updateFn = this.updater.modelUpdater;
    // 初始化的时候取一次值填充，渲染页面数据
    updateFn && updateFn(node, vm.$data[expr]);
    // 实例化watcher(调用watcher),将watcher添加到Dep中，同时定义好回调函数（数据变化后干什么）
    new Watcher(vm, expr, function(newValue){
      updateFn && updateFn(node, newValue);
    });
    // 监听input值的变化，从视图到data
    node.addEventListener('input', (event) => {
      vm.$data[expr] = event.target.value;
    })
  },
  text (node, vm, expr) {
    let updateFn = this.updater.textUpdater;
    updateFn && updateFn(node, vm.$data[expr]);
    new Watcher(vm, expr, function(newValue){
      updateFn && updateFn(node, newValue);
    });
  },
  updater: {
    modelUpdater(node, value) {
      node.value = value;
    },
    textUpdater(node, value) {
      node.textContent = value; // 此处直接设置值value，没有考虑所有的场景, 如{{message}}aaa场景
    }
  }
};