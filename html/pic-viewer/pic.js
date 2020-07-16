/*
 * @Author: tim
 * @Date: 2020-07-15 14:04:19
 * @LastEditors: tim
 * @LastEditTime: 2020-07-16 15:46:14
 * @Description: 
 */ 
;(function() { 
  let $viewerContainer = document.querySelector(".viewer-container")
  let $zoomPic = document.querySelector("#zoomPic")
  let $normalBtn = document.querySelector("#normalBtn")
  let $fillBtn = document.querySelector("#fillBtn")
  let $centerBtn = document.querySelector("#centerBtn")
  let $zoomBigBtn = document.querySelector("#zoomBigBtn")
  let $zoomSmallBtn = document.querySelector("#zoomSmallBtn")
  let $rotateButton = document.querySelector("#rotateBtn")

  let imageData = {
    width:678.24,
    height:423.9,
    left:218.88,
    top:43.55,
    rotate:0,
    scale:1,
  }

  // 重置标准图信息
  let normalImageData = {...imageData}
  let mode = 'normal'   // 标准模式

  const setMode = function(modelVal) {
    mode = modelVal
  }

  const setStyle = function() {
    let styles = [], transform = [];

    for(const k in imageData) {
      let value = imageData[k]

      // none 值不设定该属性样式
      if (value === 'none') {
        continue;
      }

      switch (k) {
        case 'left':
          console.log(value)
          styles.push("margin-left:" + value + "px;")
          break
        case 'top':
          styles.push("margin-top:" + value + "px;")
          break
        case 'rotate':
          transform.push("rotate(" + value + "deg)")
          break
        case 'scale':
          transform.push("scale(" + value + ")")
          break
        default:
          value += Number(value) ? 'px;':''
          styles.push(k + ":" + value) 
      }      
    }
    
    let transformStyle = "transform:"+ transform.join(" ") + ";"
    
    styles.push(transformStyle)
    $zoomPic.style = styles.join(" ")
  }

  const zoom = function(flag) {
    let max = 3, min = 1, step = 0.5;

    if (mode === 'fill') { // 填充模式
      max = 2
      min = 0.2
      step = 0.2
    }
    
    if (flag === 'big') {
      if (imageData.scale >= max) return
      imageData.scale += step
    } else {
      if (imageData.scale <= min) return      
      imageData.scale -= step
    }

    imageData.scale = Number(Number(imageData.scale).toFixed(1))

    setStyle()
  }

  // 标准
  $normalBtn.onclick = function() {
    setMode('normal')
    imageData = {...normalImageData}
    setStyle()
  }
  // 填充
  $fillBtn.onclick = function() {
    setMode('fill')
    imageData = {
      ...normalImageData, 
      width: 'auto!important;',
      height: 'auto;',
      left: 0,
      top: 0
    }
    setStyle()
  }
  // 旋转
  $rotateButton.onclick = function() { 
    imageData.rotate += 90
    setStyle()
  }
  // 放大
  $zoomBigBtn.onclick = function() { 
    zoom('big')
  }
  // 缩小
  $zoomSmallBtn.onclick = function() { 
    zoom('small')
  }
  // 鼠标滚动缩放图片
  $viewerContainer.onwheel = $viewerContainer.onmousewheel = (e) => {
    if (e.wheelDelta >= 120) {
      zoom('big')
    } else if (e.wheelDelta <= -120) {  
      zoom('small')
    }         
  };
  // 图片移动
  $zoomPic.onmousedown = function (e) {
    e.preventDefault();
    // 鼠标相对于图片的位置
    let disX = e.clientX - this.offsetLeft;
    let disY = e.clientY - this.offsetTop;
    
    this.onmousemove = function (e) {  
      // 计算图片位置        
      // 相对位置left(top) = 当前鼠标坐标X(Y) - 鼠标相对图片的位置disX(disY) 
      let left = e.clientX - disX;
      let top = e.clientY - disY;

      imageData.left = left;
      imageData.top = top;
      console.log(imageData)
      setStyle()
    };

    // 鼠标停止移动时，事件移除
    this.onmouseup = function (e) {
      this.onmousemove = null;
      this.onmouseup = null;
    };
    
    this.onmouseleave = function(e) {
      this.onmousemove = null;
      this.onmouseup = null;
    }
    return false;
  };

})()