/*
 * @Author: tim
 * @Date: 2020-09-27 09:52:08
 * @LastEditors: tim
 * @LastEditTime: 2020-09-27 14:21:55
 * @Description: 简单编译器
 */
// 编译器工具箱，只对页面上绑定的数据表达式进行 Watcher
const complierUnits = {
  text(node, vm, expr) {
    let updateFn = this.updater.textUpdater;
    // 初始化时渲染页面数据
    updateFn && updateFn(node, vm.$data[expr]);
    new Watcher(vm, expr, function(newValue){
      updateFn && updateFn(node, newValue);
    });
  },
  model(node, vm, expr) {
    let updateFn = this.updater.modeUpdater;
    // 初始化时渲染页面数据
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
  updater: {
    textUpdater(node, value) {
      node.textContent = value;
    },
    modeUpdater(node, value) {
      node.value = value;
    },
  },
}

class Complier {
  constructor(el, vm) {
    this.el = document.querySelector(el);
    this.vm = vm;

    let fragment = this.nodeToFragment(this.el);
    this.complie(fragment);
    this.el.appendChild(fragment);
  }
  /**
   * 将node转换为fragment
   * @param {*} node 
   */
  nodeToFragment(node) {
    let frag = document.createDocumentFragment();
    let child;
    while(child = node.firstChild) {
      frag.appendChild(child); // appendChild 会删除 child dom节点
    }
    return frag;
  }
  /**
   * 编译替换
   * @param {*} node 
   */
  complie(node) {
    debugger
    Array.from(node.childNodes).forEach(item => {      
      switch(item.nodeType) {
        case 1: // 元素
          this.elementComplier(item);
          break;
        case 3: // 文本
          this.textComplier(item);
          break;  
      }
    })
  }
  /**
   * 元素节点编译器，处理属性v-model，v-text等
   * @param {*} node 
   */
  elementComplier(node) {
    Array.from(node.attributes).forEach(attr => {
      if (attr.name.indexOf('v-') == 0 ) {
        let type = attr.name.split('-')[1];
        switch (type) {
          case 'text':
          case 'model':
            complierUnits[type](node, this.vm, attr.value);  // attr.value:v-model的表达式
            break;
        }
      }
    })
  }
  /**
   * 文本节点编译器{{message}},跟v-text共用一个编译方法
   * @param {*} node 
   */
  textComplier(node) {
    if ((/\{\{(.+)\}\}/).test(node.textContent)) {
      complierUnits.text(node, this.vm, RegExp.$1)
    }
  }
}
