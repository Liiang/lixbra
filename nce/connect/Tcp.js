
const Connect = require('./Connect');
class Tcp extends Connect {
    constructor({host = '127.0.0.1',
        port = 8765,
        timeout = 3000,
        proxy = false,
        delay = false} = {}) {
        super({ host, port, timeout, proxy, delay });
        const net = require('net');
        if (this._proxy) {
            this._netsvr = net.createConnection(
                this._port,
                this._host, this.connect.bind(this));
        
        } else {
            this._netsvr = net.createServer(this.connect.bind(this));
            this._netsvr.listen(this._port, this._host, this.listen.bind(this));
            var self = this;
            //this._netsvr.on("connection", this.connect.bind(this));
            this._netsvr.on("close", this.close.bind(this));
           // this._netsvr.on("listening", this.listen.bind(this));
            this._netsvr.on("error", this.error.bind(this));
        }
    }

}
module.exports = Tcp;