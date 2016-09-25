class _Service {
    constructor() { }

}

let Service = new Proxy(_Service, {
    construct: function (target, args) {
        return new target(args);
    },
    apply: function (target, ctx, args) {
        return new target(args);
    }
});
module.exports = Service;