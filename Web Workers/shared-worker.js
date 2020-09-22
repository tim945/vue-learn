let a = 666;

onconnect = function (e) {
  var port = e.ports[0];
  console.log(e, port)
  port.postMessage(a);
  port.onmessage = function () {
    a++;
    port.postMessage(a);
  };
};