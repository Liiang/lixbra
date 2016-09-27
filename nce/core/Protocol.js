const CONNECT_TYPE = require('../utils/Common').CONNECT_TYPE;
const assert = require('assert');

class Protocol {
    constructor({
        host = '127.0.0.1',
        port = 8765,
        timeout = 3000,
        maxSize = 10000,
        proxy = false,
        delay = false,
        type = CONNECT_TYPE.TCP
    } = {}) {
        //this.clients = new Map();
        this._host = host;
        this._port = port;
        this._maxSize = maxSize;
        this._timeout = timeout
        this._proxy = proxy;
        this._delay = delay;
        this._type = type;
        this._connect = null;
        if (!this._delay) {
            this.iniConnect();
        }

    }
    toString() {

        return `${this._host}:${this._port}`
    }
    initConect() {
        switch (this._type) {
            case CONNECT_TYPE.TCP:
                const Tcp = require('../connect/Tcp');
                this._connect = new Tcp({
                    host: this._host,
                    port: this._port,
                    timeout: this._timeout,
                    proxy: this._proxy,
                    maxSize: this._maxSize
                });
                break;
            case CONNECT_TYPE.UDP:
                break;
            case CONNECT_TYPE.HTTP:
                break;
            case CONNECT_TYPE.WS:
                break;
            case CONNECT_TYPE.SI:
                break;
            default:
                assert.ok(false, 'unknow TYPE');
                break;
        }
    }
    $BeforeSend() {}
    $AfterRecv() {}
    connect(socket) {}
    recv(socket) {}
    close(socket) {}
    cbEncrypt(msgbuffer) {

    }
    cbDecrypt(msgbuffer) {

    }

}