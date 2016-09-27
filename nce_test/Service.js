let Service = require('../nce').Service;
console.info("Service test begin ");
class TestService extends Service {
    constructor() {
        super("gege", {
            age: 0,
            login: () => {
                return this.age;
            }
            
        });
    }
    login({
        username = '',
        passwd = ''
    }) {
        console.info(username + ',' + passwd);
    }
    register({
        username,
        passwd,
        email
    }) {
        console.info(username + ',' + passwd + ',' + email);
    }
}

let test = Service("gege", {
    age: 3,
    login: (a,b) => {
         console.info('login'+this.age+":"+a+":"+b);
      let x=this.register(a,b);
      console.info(x);
        return this.age;
    },register:(a,b)=>{
        return a+b;
    }
});
// let test2= TestService({debug:true});

console.info(test.methods);
 console.info('-----------');
console.info(test.login(1));
 console.info('-----------');
console.info(Reflect.ownKeys(test));

console.info("Service test end ");
