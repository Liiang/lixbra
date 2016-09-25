
class Connect {
    constructor({host = '127.0.0.1',
        port = 8765,
        timeout = 3000,
        maxSize = 10000,
        proxy = false,
        } = {}) {
        this._host = host;
        this._port = port;
        this._maxSize = maxSize;
        this._timeout = timeout
        this._proxy = proxy;
       
        this._sockets = new Map();
        this._status = 0;
    }
    onListen() {
        //服务端监听成功
        console.info('listen');
        this._status = 1;
    }
    onConnect(socket) {

        if (this._proxy) {
            this._status = 1;
        }
        let key = Symbol(this._host);
        this._sockets.set(key, socket);

        return key;
    }
    onError(e) {
        console.info('error');

    }
    onClose(e) {
        console.info('close');
        this._status = 2;

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
        console.log(data.toString());
    }
    onCloseCli(socket, key, data) {
        if (this._proxy) {
            this._status = 2;
        }
        this._sockets.delete(key);
        console.log('close cli');
    }
   
    send() { }
    close() { }
}
module.exports = Connect;