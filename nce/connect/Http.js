const Connect = require('./Connect');
class Http extends Connect {
    constructor({host = '127.0.0.1',
        port = 8765,
        timeout = 3000,
        maxSize = 10000,
        proxy = false,
        delay = false} = {}) {
        super({ host, port, timeout, proxy, delay, maxSize });
       
        if (this._proxy) {
            // this._netsvr = net.createConnection(
            //     this._port,
            //     this._host, this.onConnect.bind(this));

        } else {
            const http = require('http');
          //  this._netsvr = net.createServer(this.onConnect.bind(this));
          //  this._netsvr.listen(this._port, this._host, this.onListen.bind(this));
           // var self = this;
           // this._netsvr.on("close", this.onClose.bind(this));
          //  this._netsvr.on("error", this.onError.bind(this));
        }
    }
}
module.exports = Http;