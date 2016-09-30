// JavaScript File

let instance = null;
let Logger = new Proxy({}, {
    construct: function(target, args) {
        if (!instance) {
            instance = new target(args);
        }
        return instance;
    },
    apply: function(target, ctx, args) {
        if (!instance) {
            instance = new target(args);
        }
        return instance;
    }
});
module.exports =  Logger ;