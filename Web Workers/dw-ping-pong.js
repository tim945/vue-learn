/*
 * @Author: tim
 * @Date: 2020-06-24 11:02:47
 * @LastEditors: tim
 * @LastEditTime: 2020-09-22 10:13:00
 * @Description: 
 */ 
onmessage = (e) => {
  console.log(`Worker: Received message - ${e.data}`);
  setTimeout(() => {
    postMessage("PONG");
  }, 3000)
}