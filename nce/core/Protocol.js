const CONNECT_TYPE = require('../utils/Common').CONNECT_TYPE;
const assert = require('assert');

class Protocol {
    constructor({host = '127.0.0.1',
        port = 8765,
        timeout = 3000,
        maxSize = 10000,
        proxy = false,
        delay = false,
        type = CONNECT_TYPE.TCP} = {}) {
        //this.clients = new Map();
        this._host = host;
        this._port = port;
        this._maxSize = maxSize;
        this._timeout = timeout
        this._proxy = proxy;
        this._delay = delay;
        this._type = type;
        switch (this._type) {
            case CONNECT_TYPE.TCP:
                const Tcp = require('../connect/Tcp');
                this._connect = new Tcp({ host, port, timeout, proxy, maxSize });
                break;
            case CONNECT_TYPE.UDP: break;
            case CONNECT_TYPE.HTTP: break;
            case CONNECT_TYPE.WS: break;
            case CONNECT_TYPE.SI: break;
            default:
                assert.ok(false, 'unknow TYPE');
                break;
        }

    }
    $BeforeSend() { }
    $AfterRecv() { }
    close() { }
     cbEncrypt(msgbuffer){

    }
    cbDecrypt(msgbuffer){
        
    }

}