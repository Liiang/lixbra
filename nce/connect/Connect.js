class Connect {
    constructor({
        host = '127.0.0.1',
        port = 8765,
        timeout = 3000,
        maxSize = 10000,
        proxy = false,
        type = 0,
    } = {}) {
        this._host = host;
        this._port = port;
        this._maxSize = maxSize;
        this._timeout = timeout
        this._proxy = proxy;
        this._type = type;
        this._sockets = new Map();
        this._status = 0;
        this.setCallback();
        this._netsvr =null;
    }
    setCallback({
        cbListen = function() {},
        cbConnect = function() {},
        cbError = function() {},
        cbClose = function() {},
        cbCloseCli = function() {},
        cbRecv = function() {}
    } = {}) {
        this._cbListen = cbListen;
        this._cbConnect = cbConnect;
        this._cbError = cbError;
        this._cbClose = cbClose;
        this._cbCloseCli = cbCloseCli;
        this._cbRecv = cbRecv;
    }
    onListen() {
        //服务端监听成功

        // this._status = 1;
        this._cbListen();
    }
    onConnect(socket) {

        if (this._proxy) {
            this._status = 1;
        }
        let key = Symbol(this._host);
        this._sockets.set(key, socket);
        this._cbConnect(socket);
        return key;
    }
    onError(e) {
        this._cbError(e);
    }
    onClose(e) {

        this._status = 2;
        this._cbClose();

    }
    endCli(msg) {
        if (this._sockets.size > 0) {
            for (let [key, value] of this._sockets) {
                if (value) {
                    value.end(msg);
                    this._sockets.delete(key);
                }
            }
        }
    }

    onRecv(socket, key, data) {

        this._cbRecv(socket, key, data);
    }
    onCloseCli(socket, key, data) {
        if (this._proxy) {
            this._status = 2;
        }
        this._sockets.delete(key);
        this._cbCloseCli(socket, key, data);

    }

    send() {}
    close() {}
}
module.exports = Connect;