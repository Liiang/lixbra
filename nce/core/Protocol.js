const assert = require('assert');
const CONNECT_TYPE = require('../utils/Common').CONNECT_TYPE;
class Protocol {
    constructor() {
        this._connectTypes = new Map();
    }

    addConnectType({
        host = '127.0.0.1',
        port = 8765,
        timeout = 3000,
        maxSize = 10000,
        proxy = false,
        type = CONNECT_TYPE.TCP,
    } = {}) {
        let connect = null;
        if (type === CONNECT_TYPE.TCP) {
            const Tcp = require('../connect/Tcp');
            connect = new Tcp({
                host,
                port,
                timeout,
                proxy,
                maxSize
            });

        }
        if (connect) {
            this._connectTypes.set(type, connect);
            connect.setCallback({
                cbListen: this.cbListen.bind(this, type),
                cbConnect: this.cbConnect.bind(this, type),
                cbError: this.cbError.bind(this, type),
                cbClose: this.cbClose.bind(this, type),
                cbCloseCli: this.cbCloseCli.bind(this, type),
                cbRecv: this.cbRecv.bind(this, type)
            })
            if (!proxy) {
                const process = require('process');
                console.info("process");
                process.on("exit", () => {
                    console.info("exit");
                });
                process.on("beforeExit", () => {
                    console.info("beforeExit");
                });
                process.on("SIGTERM", () => {
                    console.info("SIGTERM");
                });
                process.on("SIGINT", () => {
                    console.info("SIGINT");
                });
                process.on("SIGHUP", () => {
                    console.info("SIGHUP");
                });

            }
        }
    }
    cbListen(type) {
        console.info(type);
    }
    cbConnect(type, socket) {
        // session   管理  
        console.info("connect socket");

    }
    cbError(key, e) {
        console.info("error");
    }
    cbClose(type, socket, key, data) {
        console.info("close");
    }
    cbCloseCli(type, socket, key, data) {
        console.info("closecli");
    }
    cbRecv(type, socket, key, data) {
        let req = this.decript(data);
        console.info("recv");
    }

    encrypt(msgbuffer) {
        return msgbuffer;
    }
    decrypt(msgbuffer) {
        return msgbuffer;
    }


}
module.exports = Protocol;