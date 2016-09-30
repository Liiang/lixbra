class Service {
    constructor(name = 'test', exportMethods = []) {

        this._name = name;
        this._methods = new Set();

        for (let value of exportMethods) {
            this._addExport(value);
        }
        this._exports = Array.from(this._methods);
    }
    _addExport(methodName) {
        let ret = false;
        do {
            if (this._methods.has(methodName)) {
                console.warn(`${methodName} is Exist `)
                break;
            }
            if (methodName in this) {
                this._methods.add(methodName);
                ret = true;
                break;
            }
            console.warn(`${methodName} is not in this `)
        } while (false);
        return ret;
    }
    addExport(methodName) {
        // console.info(methodName);
        this._addExport(methodName);
        this._exports = Array.from(this._methods);
    }
    delExport(methodName){
         this._methods.add(methodName);
        this._exports = Array.from(this._methods);
    }
    exports() {
        return this._exports;
    }
    $before(...req) {
        return [...req];
    }
    $end(...rsp) {
        return [...rsp];
    }
    toString() {
        return this._name;
    }

    get name() {
        return this._name;
    }

}
// let Service = new Proxy(_Service, {
//     construct: function(target, args) {
//         return Reflect.construct(target, args);

//     },
//     apply: function(target, ctx, args) {
//         return Reflect.construct(target, args);

//     }
// });
module.exports = Service;