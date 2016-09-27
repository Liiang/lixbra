class _Service {
    constructor(name, obj = {}) {
        if (new.target != _Service) {
            throw new Error("不可被继承");
        }
        this._name = name;
        this._methods = [];
        this._$methods = [];
        this._$before = false;
        //   this._name = name;

        for (let key of Reflect.ownKeys(obj)) {
            //  console.info(key);

          
            this.$add(key,obj[key]);
            //this[key] = obj[key];
        }
        console.info("create Service");
    }
    $add(name, fn) {
        if (!name || typeof name != 'string') {
            throw new Error('error fn name ');
        }
        if (name.length < 2 || name.charAt(0) === '$') {
            throw new Error('error fn name can not $ start ');
        }
        if (name in this) {
            throw new Error('error fn  name exist ');
        }
        if (typeof fn === 'function') {
            this._methods.push(name);
            this._$methods[name] = fn;
            fn.bind(this);
            var self = this;
            this[name] = function(...args)  {
                let req = [...args];
                if (!self._$before) {
                    self._$before = true;
                    req = self.$before(...args);
                }
                let rsp = self._$methods[name].apply(self, req);
                
                if (self._$before) {
                    self._$before = false;
                   return  self.$end(rsp);
                }
                return rsp;
            }
        }
        else {
            console.info(name+":"+fn);
            this[name] = fn;
        }
    }
    $before(...req) {
        console.info('before');
       // console.info(...req);
        return [2,...req];
    }
    $end(...rsp) {
          console.info('end');
         // console.info(...rsp);

    }
    toString() {
        return this._name;
    }
    get methods() {


        return this._methods;
    }

}
let Service = new Proxy(_Service, {
    construct: function(target, args) {
        return Reflect.construct(target, args);

    },
    apply: function(target, ctx, args) {
        return Reflect.construct(target, args);

    }
});
module.exports = Service;