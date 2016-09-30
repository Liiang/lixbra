class _Dispatcher{
    constructor(){}
    listen(){
         console.info('listen');
    }
       error(){
             console.info('error');
       }
    close(){
        console.info('close'); 
    }
    
    connect(){
          console.info('connect');
    }

    closeCli(data){ console.log('close cli');}
    recv(data){
          console.log(data.toString());
    }
}
let instance = null;
let Dispatcher = new Proxy(_Dispatcher, {
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
module.exports =Dispatcher;