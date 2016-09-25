
class Connect {
    constructor({host = '127.0.0.1',
        port = 8765,
        timeout = 3000,
        proxy = false,
        delay = false} = {}) {
        this._host = host;
        this._port = port;
        this._timeout = timeout
        this._proxy = proxy;
        this._delay = delay;
    }
    listen() {
        //服务端监听成功
        console.info('listen');
    }
    connect(socket) {
        //连接请求事件
        let st = null;
        if (this._proxy) {
            st = this._netsvr;
        } else {
            st = socket;
        }

        st.on('data', this.recv.bind(this));
     
        st.on('close', (e) => {
            console.log('close cli');
        });
        st.write("2222");
        console.info('connect');
    }
    error() {
        console.info('error');
    }
    close() {
        console.info('close');
    }

    send() { }
    recv(data, data2) {
        if (this._proxy) {
            this._netsvr.end();
        }
        console.log(data.toString());
    }
}
module.exports = Connect;