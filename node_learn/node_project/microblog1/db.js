/**
 * Created by mac on 16/7/1.
 */

var settings=require("./settings");
var mongoose = require('mongoose');
mongoose.connect("mongodb://"+settings.ip+"/"+settings.db);
var db = mongoose.connection;
module.exports={
    "dbCon":db,
    "mongoose":mongoose
};
