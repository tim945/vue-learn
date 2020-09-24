/*
 * @Author: tim
 * @Date: 2020-09-23 15:08:18
 * @LastEditors: tim
 * @LastEditTime: 2020-09-24 17:24:29
 * @Description: We can do better, we should be better. 我们能做得更好，也应该做得更好。
 */

// 垂直滚动条控制，主要有以下几点处理：
// 1、内容原始滚动条的隐藏，通过计算滚动条的宽度处理
// 2、内容的原始滚动事件：onscroll
// 3、模拟滚动槽点击事件
// 4、模拟滚动条拖动事件

// IE版本
console.log(document.documentMode)

/* istanbul ignore next */
const on = function(element, event, handler) {
  if (element && event) {
    element.addEventListener(event, handler, false);
  }
}

/* istanbul ignore next */
const off = function(element, event, handler) {
  if (element && event) {
    element.removeEventListener(event, handler, false);
  }
}

// 计算滚动条大小
const scrollbarWidth = () => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const widthWithScroll = outer.clientWidth;
  outer.parentNode.removeChild(outer);

  const scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};

;(function() {
  const $scrollar = document.querySelector('.scrollbar');
  const $scrollbarWrap = $scrollar.querySelector('.scrollbar__wrap');
  const $scrollbarVBar = $scrollar.querySelector('.scrollbar__bar.is-vertical');
  const $scrollbarThumb = $scrollbarVBar.querySelector('.scrollbar__thumb');
  
  // 隐藏原始滚动条
  const gutter = scrollbarWidth();
  if (gutter) {
    const gutterWith = `-${gutter}px`;

    $scrollbarWrap.style.marginBottom = gutterWith
    $scrollbarWrap.style.marginRight = gutterWith
  }

  // 滚动条显示宽度、高度占比
  let heightPercentage, widthPercentage, sizeHeight, sizeWidth;  
  heightPercentage = ($scrollbarWrap.clientHeight * 100 / $scrollbarWrap.scrollHeight);
  widthPercentage = ($scrollbarWrap.clientWidth * 100 / $scrollbarWrap.scrollWidth);
  sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
  sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';
  $scrollbarThumb.style.height = sizeHeight

  // 内容区滚动
  $scrollbarWrap.onscroll = function (){
    // scrollbar位置计算  Y轴位移 = scrollbar.translateY(wrap.scrollTop/wrap.clientHeight*100)
    // console.log(this.scrollTop, this.clientHeight)
    let moveY = (this.scrollTop * 100) / this.clientHeight;
    // let moveX = (this.scrollLeft * 100) / this.clientWidth;
    // 模拟滚动条定位
    $scrollbarThumb.style.transform = `translateY(${ moveY }%)`
  }

  // 模拟滚动条滚动槽点击事件
  $scrollbarVBar.onmousedown = function(e) {
    let offset = Math.abs(e.clientY - e.target.getBoundingClientRect().top);  // 点击处相对于滚动条的距离
    let thumbHalf = $scrollbarThumb.offsetHeight / 2;   // 拖动条的长度/2
    let thumbPositionPercentage = (offset - thumbHalf) * 100 / this.offsetHeight;   // 拖动条移动距离比例   <--- 减1/2高度，而不是整个拖动条高度？
    // let thumbPositionPercentage = (offset - $scrollbarThumb.offsetHeight) * 100 / this.offsetHeight;   // 拖动条移动距离比例  <--- 容易理解

    // console.log(e.clientY, e.target.getBoundingClientRect().top, offset, thumbHalf)
    // scrollTop 设置为负值时，其属性值为 0，即 scrollTop 属性值不会小于 0 
    $scrollbarWrap.scrollTop = (thumbPositionPercentage * $scrollbarWrap.scrollHeight / 100);
  }

  // 模拟滚动条滚动
  // target和currentTarget的区别是: target:触发事件的元素。currentTarget:事件绑定的元素。
  $scrollbarThumb.onmousedown = function(e) {
    // console.log(e)
    e.stopPropagation();
    // prevent click event of right button
    if (e.ctrlKey || e.button === 2) {
      return;
    }

    let cursorDown = false;
    startDrag(e);
    
    // 点击处相对于拖动条的距离 = e.clientY - e.currentTarget.getBoundingClientRect().top
    this.Y = e.currentTarget.offsetHeight - (e.clientY - e.currentTarget.getBoundingClientRect().top);
  }

  const startDrag = function (e) {
    // event.preventDefault阻止浏览器默认行为
    // event.stopPropagation阻止事件冒泡
    // event.stopImmediatePropagation停止一个事件继续执行
    e.stopImmediatePropagation();
    cursorDown = true;

    // this.onmousemove = function(e) {
    //   mouseMoveDocumentHandler(e);
    // };
    // this.onmouseup = function(e) {
    //   mouseUpDocumentHandler(e);
    // }
    on(document, 'mousemove', mouseMoveDocumentHandler);
    on(document, 'mouseup', mouseUpDocumentHandler);
    document.onselectstart = () => false;
  }

  const mouseMoveDocumentHandler = function(e) {
    if (cursorDown === false) return;
    const target = $scrollbarThumb;
    const prevPage = target.Y;
    // console.log(prevPage, target)
    if (!prevPage) return;

    const offset = ($scrollbarVBar.getBoundingClientRect().top - e.clientY) * -1;   // 鼠标相对滚动槽相对位置 Y1
    const thumbClickPosition = (target.offsetHeight - prevPage);  // 鼠标相对拖动条相对位置 Y2
    // 滚动距离 Y = Y1-Y2
    const thumbPositionPercentage = (offset - thumbClickPosition) * 100 / $scrollbarVBar.offsetHeight;  // 拖动条移动距离占比

    $scrollbarWrap.scrollTop = thumbPositionPercentage * $scrollbarWrap.scrollHeight / 100;
  }

  const mouseUpDocumentHandler = function(e) {
    cursorDown = false;
    e.target.Y = 0;
    off(document, 'mousemove', mouseMoveDocumentHandler);
    off(document, 'mouseup', mouseUpDocumentHandler);
    document.onselectstart = null;
  }

})()

