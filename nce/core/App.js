'use strict'
const Protocol=require('./Protocol')
const Session=require('./Session')

class _App {
    constructor(cbFun) {

        this._now = Date.now();
        //  console.info('init _App');协议列表
        // 代理 
        this._mProxy = new Map();
        // 服务  
        this._mService = new Map();
        // 协议 
        
       // this._sessionMaxSize=10000;
        this._session=new Session();
        this._protol=new Protocol();
        cbFun(this);
    }
 addConnectType(args) {
         this._protol.addConnectType(args);
    }
    get now() {
        return this._now;
    }
    addProxy(proxy) {
        this._mProxy.set(null,null);
    }
    addService(server) {
        let name=server.name;
     //   let exports=server.exports();
        this._mService.set(name,server);
    }
    setProtol(protol) {
        this._protol=protol;
    }
    
    get session(){
        return this._session;
    }
    config() {}
    toString() {
        this._n++;
        console.info(Date.now(), this.now);
    }
    run(cbFun) {}
}
let instance = null;
let App = new Proxy(_App, {
    construct: function(target, args) {
        if (!instance) {
            instance = Reflect.construct(target,args);
        }
        return instance;
    },
    apply: function(target, ctx, args) {
        if (!instance) {
            instance =  Reflect.construct(target,args);
        }
        return instance;
    }
});
module.exports = App;