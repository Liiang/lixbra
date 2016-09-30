const Cache = require('../utils/Cache')
class BussinessMgr   {
    constructor({
        maxSize = 1000,
        expiryTime = 3000 ,
        type = 0,
        tickTime = 100,
        tickNum = 100,
        timeOutCallback = null
    } = {}) {
    this._cache=   new Cache({
            maxSize,
            expiryTime,
            type,
            tickTime,
            tickNum
        });
    }
}
module.exports = BussinessMgr;