let Cache = require('../nce').Cache;
console.info("Cache test begin ");
let cache = new Cache({ maxSize: 1000 });
let startTime = Date.now();
for (let i = 0; i < 10000; i++) {
    cache.set(i, { n: i, age: i * i / 2, name: "lixiang" + i });
}
let setTime = Date.now();
let clsTime =0;
let arrs = [];
function chechOut() {
    if (cache.size > 0) {
        arrs.push(cache.size);
        setTimeout(chechOut, 500);
        return;
    }
    clsTime = Date.now();
    console.info(`setTime:${setTime-startTime},clsTime:${clsTime-setTime}`);
    console.info(arrs);
}
setTimeout(chechOut, 500);

console.info(`cache size: ${cache.size}`);
console.info("Cache test end ");
