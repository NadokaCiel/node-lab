'use strict';

import mongoose from 'mongoose';
import config from 'config-lite';
mongoose.connect(config.url, {useMongoClient:true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open' ,() => {
	console.log("MongoDb's ready.")
})

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('close', function() {
    console.log("MongoDb is disconnected, reconnecting...");
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

export default db;
