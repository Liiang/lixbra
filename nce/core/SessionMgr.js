const Cache = require('../utils/Cache')
class SessionSgr   {
    constructor({
        maxSize = 1000,
        expiryTime = 1000 * 10 * 60,
        type = 0,
        tickTime = 100,
        tickNum = 100,
        timeOutCallback = null
    } = {}) {
    this._cache=new    Cache({
            maxSize,
            expiryTime,
            type,
            tickTime,
            tickNum
        });
    }
}
module.exports = Session;