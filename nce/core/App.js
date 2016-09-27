'use strict'

class _App {
    constructor() {

        this._now = Date.now();
        //  console.info('init _App');协议列表
        // 代理 
        this._mProxy = new Map();
        // 服务  
        this._mService = new Map();
        // 协议 
        this._mProtocols = new Map();
        this._sessionMaxSize=10000;
        this._session=null;
    }

    get now() {
        return this._now;
    }
    addProxy() {

    }
    addService() {

    }
    addProtol({
        host = '127.0.0.1',
        port = 8765,
        type = 0
    } = {}) {

    }
    get session(){
        return this._session;
    }
    config() {}
    toString() {
        this._n++;
        console.info(Date.now(), this.now);
    }
    run() {}
}
let instance = null;
let App = new Proxy(_App, {
    construct: function(target, args) {
        if (!instance) {
            instance = new target(args);
        }
        return instance;
    },
    apply: function(target, ctx, args) {
        if (!instance) {
            instance = new target(args);
        }
        return instance;
    }
});
module.exports = App;