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
    get n() {
        return this._n;
    }
    toString() {
        this._n++;
        console.info(Date.now(), this.now);
    }
}
let instance = null;
let App = new Proxy(_App, {
    construct: function(target, args) {
       // console.info('const AppProxy');
        if (!instance) {
            instance = new target(args);
        }
        return instance;
    },
    apply: function(target, ctx, args) {
        //console.info('apply AppProxy');
        if (!instance) {
            instance = new target(args);
        }
        return instance;
    }
});
module.exports = App;