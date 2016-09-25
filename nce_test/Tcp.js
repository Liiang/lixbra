const Tcp = require('../nce').Tcp;
let tcp = new Tcp();
let tcp_cli = new Tcp({ proxy: true });
tcp_cli.send("lixiang")
 let tcp_cli2 =null;
setTimeout(function () {
      tcp_cli2 = new Tcp({ proxy: true });
    tcp_cli2.send("lixuang");

}, 100);
setTimeout(function () {
    tcp_cli.send("gegege")
    tcp_cli2.close();
    
}, 150);
setTimeout(function () {
    tcp.close();
}, 200);

setTimeout(function () {
   
    tcp_cli.close();
}, 400);