/*
 * @Author: tim
 * @Date: 2020-09-23 15:08:18
 * @LastEditors: tim
 * @LastEditTime: 2020-09-23 18:13:45
 * @Description: We can do better, we should be better. 我们能做得更好，也应该做得更好。
 */
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

(function() {
  const $scrollar = document.querySelector('.scrollbar');
  const $scrollbarWrap = $scrollar.querySelector('.scrollbar__wrap');
  const $scrollbarVBar = $scrollar.querySelector('.scrollbar__bar.is-vertical');
  const $scrollbarThumb = $scrollbarVBar.querySelector('.scrollbar__thumb');
  
  // 隐藏原始滚动条
  const gutter = scrollbarWidth();
  if (gutter) {
    const gutterWith = `-${gutter}px`;

    // $scrollbarWrap.style.marginBottom = gutterWith
    // $scrollbarWrap.style.marginRight = gutterWith
  }

  // 滚动条显示宽度、高度占比
  let heightPercentage, widthPercentage, sizeHeight, sizeWidth;  
  heightPercentage = ($scrollbarWrap.clientHeight * 100 / $scrollbarWrap.scrollHeight);
  widthPercentage = ($scrollbarWrap.clientWidth * 100 / $scrollbarWrap.scrollWidth);
  sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
  sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';
  $scrollbarThumb.style.height = sizeHeight

  $scrollbarWrap.onscroll = function (){
    // scrollbar位置计算  Y轴位移 = scrollbar.translateY(wrap.scrollTop/wrap.clientHeight*100)
    let moveY = ((this.scrollTop * 100) / this.clientHeight);
    // let moveX = ((this.scrollLeft * 100) / this.clientWidth);

    $scrollbarVBar.style.transform = `translateY(${ moveY }%)`
  }

})()

