
const Connect = require('./Connect');
const CONNECT_TYPE = require('../utils/Common').CONNECT_TYPE;
class Tcp extends Connect {
    constructor({host = '127.0.0.1',
        port = 8765,
        timeout = 3000,
        maxSize = 10000,
        proxy = false,
        } = {}) {
        super({ host, port, timeout, proxy, maxSize ,type:CONNECT_TYPE.TCP});
        const net = require('net');
        if (this._proxy) {
            this._netsvr = net.createConnection(
                this._port,
                this._host, this.onConnect.bind(this));

        } else {
            this._netsvr = net.createServer(this.onConnect.bind(this));
            this._netsvr.listen(this._port, this._host, this.onListen.bind(this));
            var self = this;
            this._netsvr.on("close", this.onClose.bind(this));
            this._netsvr.on("error", this.onError.bind(this));
        }
    } onConnect(socket) {
        //连接请求事件
      //  console.info("connect");
        let st = null;
        if (this._proxy) {
            st = this._netsvr;
        } else {
            st = socket;
        }
        let key = super.onConnect(st);
        st.on('data', this.onRecv.bind(this, st, key));

        st.on('close', this.onCloseCli.bind(this, st, key));

    } send(msg,key) {
        if (this._proxy) {
            this._netsvr.write(msg);
        } else {
            console.info("warn host is not send method");
        }
    }
    close(msg) {

        if (this._proxy) {
            this._netsvr.end(msg);
        } else {
            this._netsvr.close();
            this.endCli(msg);
        }
    }

}
module.exports = Tcp;