'use strict';

import redis from 'redis'
import bluebird from 'bluebird'
import config from 'config-lite'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const store = redis.createClient()
store.on("error", err => {
    console.log("Redis Error " + err)
});

store.on("ready", () => {
    console.log("Redis's ready.")
})

export default store
