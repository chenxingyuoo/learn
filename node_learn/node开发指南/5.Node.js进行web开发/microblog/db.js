/**
 * Created by chenxingyu on 2016/12/19.
 */
/*var settings = require('../settings');
 var mongodb = require('mongodb');
 var Db = mongodb.Db;
 var Connection = mongodb.Connection;
 var Server = mongodb.Server;

 module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}));*/

var settings = require("./settings");
var mongoose = require('mongoose');
// console.log("mongodb://" + settings.host + "/" + settings.db);
mongoose.connect("mongodb://" + settings.host + "/" + settings.db);
var db = mongoose.connection;
module.exports = {
    "dbCon": db,
    "mongoose": mongoose
};