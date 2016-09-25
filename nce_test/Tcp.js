const Tcp = require('../nce').Tcp;
let tcp=new Tcp();
let tcp_cli=new Tcp({proxy:true});
setTimeout(function(){
let tcp_cli2=new Tcp({proxy:true});

},1000);