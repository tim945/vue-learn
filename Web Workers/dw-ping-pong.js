/*
 * @Author: tim
 * @Date: 2020-06-24 11:02:47
 * @LastEditors: tim
 * @LastEditTime: 2020-06-24 11:03:01
 * @Description: 
 */ 
onmessage = (e) => {
  console.log(`Worker: Received message - ${e.data}`);
  postMessage("PONG");
}