/*
 * @Author: tim
 * @Date: 2020-09-22 13:41:01
 * @LastEditors: tim
 * @LastEditTime: 2020-09-22 14:58:26
 * @Description:
 */
(function () {
  let $body = document.querySelector("body")
  let $dragBox = document.querySelector(".drag-box");
  let $dragTitle = document.querySelector(".drag-title");

  $dragTitle.onmousedown = function (e) {
    e.preventDefault();

    $body.classList.add('body-overflow')

    let disX = e.clientX - this.offsetLeft;
    let disY = e.clientY - this.offsetTop;
    let styL = +$dragBox.style.marginLeft.replace(/\px/g, '')
    let styT = +$dragBox.style.marginTop.replace(/\px/g, '')
    console.log(disX, disY);

    this.onmousemove = function (e) {
      let left = e.clientX - disX;
      let top = e.clientY - disY;
      $dragBox.style.marginLeft = left + styL + "px";
      $dragBox.style.marginTop = top  + styT + "px";
    };
    // 鼠标停止移动时，事件移除
    this.onmouseup = function (e) {
      this.onmousemove = null;
      this.onmouseup = null;
      $body.classList.remove('body-overflow')
    };

    this.onmouseleave = function (e) {
      this.onmousemove = null;
      this.onmouseup = null;
      $body.classList.remove('body-overflow')
    };
    return false;
  };
})();
