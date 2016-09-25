'use strict'

class _App {
    constructor() {

        this._now = Date.now();
        //  console.info('init _App');
        this._n = 0;
    }

    get now() {
        return this._now;
    }
    addProxy() {

    }
    addService() {

    }
    addProtol({host = '127.0.0.1', port = 8765, type = 0} = {}) {

    }
    config() { }
    toString() {
        this._n++;
        console.info(Date.now(), this.now);
    }
}
let instance = null;
let App = new Proxy(_App, {
    construct: function (target, args) {
        if (!instance) {
            instance = new target(args);
        }
        return instance;
    },
    apply: function (target, ctx, args) {
        if (!instance) {
            instance = new target(args);
        }
        return instance;
    }
});
module.exports = App;