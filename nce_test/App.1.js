// JavaScript File
const nce = require('../nce');
const App = nce.App;
const Service = nce.Service;

let cli= App(function(app){
     app.addConnectType({ proxy: true });
}).run();