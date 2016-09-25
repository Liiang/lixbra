'use strict'
const assert = require('assert');

class Cache {
    /**
    * maxSize :缓存大小,
    *  type:0:null, 1 先进先出
    * Time:缓存时间,
    * ic kTime :缓存更新滴答时间,
    * tickNum: 一次滴答更新最大数据数量,
    * timeOutCallback
    */
    constructor({
        maxSize = 1000,
        expiryTime = 1000,
        type = 0,
        tickTime = 100,
        tickNum = 100,
        timeOutCallback = null
    } = {}) {
        this._maxSize = maxSize;
        this._type = type;
        this._cache = new Map();
        this._expiryTime = expiryTime < 1000 ? 1000 : expiryTime; // 毫秒   超时时间  不得  小于  1 秒钟 
        this._tickTime = tickTime > 100 ? tickTime : 100;

        this._tickNum = tickNum>this._maxSize ? this._maxSize :tickNum;
        this._checkNum = this._tickNum * 1.2;
        this._timeOutCallback = null;
        if (timeOutCallback instanceof Function) {
            this._timeOutCallback = timeOutCallback;
        }
        this._handerTimeout = setTimeout(this.timeCheck.bind(this), this._tickTime);
    }
    timeCheck() {
        if (this._handerTimeout) {
            clearTimeout(this._handerTimeout);
        }
        do {
            if (0 >= this._cache.size) {
                break;
            }
            let hitNum = 0;
            let checkNum = 0;

            let tnow = Date.now();
            let retCb = false;
            for (let [key, value] of this._cache) {
                checkNum++;
                if (tnow < value.expire) {
                    continue;
                }
                retCb = false;
                hitNum++;
                if (value.callback) {
                    let ret = value.callback(key, value.value);
                    if (ret instanceof Boolean) {
                        retCb = ret;
                    }
                }
                if (!retCb && this._timeOutCallback) {
                    this._timeOutCallback(key, value.value);
                }
                this._cache.delete(key);
                //TODO 在这里可以动态调整滴答时间和tickNum
                if (checkNum >= this._checkNum) {
                    break;
                }
                if (hitNum >= this._tickNum) {
                    break;
                }

            }

        } while (false);


        this._handerTimeout = setTimeout(this.timeCheck.bind(this), this._tickTime);
    }

    set(key, value, callback) {

        this._cache.delete(key);
        if (this._cache.size >= this._maxSize) {
            return null;
        }
        let _callback = null;

        if (callback instanceof Function) {
            _callback = callback;
        }
        var record = {
            value: value,
            expire: this.expiryTime + Date.now(),
            callback: _callback
        };

        this._cache.set(key, record);

        return value;
    }
    get(key) {
        var data = this._cache.get(key);
        if (typeof data != "undefined") {
            return data.value;
        }
        return null;
    }
    del(key) {
        this._cache.delete(key);
    }

    cls() {
        this._cache.clear();

    }
    keys() {
        return this._cache.keys();
    }
    get maxSize() {
        return this._maxSize;
    }
    get size() {
        return this._cache.size;
    }
}
module.exports = Cache;