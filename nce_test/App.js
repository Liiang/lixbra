// JavaScript File
const nce = require('../nce');
const App = nce.App;
const Service = nce.Service;
class Test extends Service {
    constructor() {
        super("LxTest", ['login', 'register']);

    }
    login() {}
    register() {}
}
let svr= App(function(app){
    app.addService(new Test());
    app.addConnectType();
});
svr.run();
