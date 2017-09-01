var mongoose = require('mongoose');
var Database = require('./baseClasses/databaseBase.js')
var pageDB = new Database("Admin","somePassword","jtmorris-me","pages",require("./schemas/").pageSchema);



//var pageDB = new Database("Admin", "GTx79^zwQ","pages",require("./schemas/pageSchema"));
//console.log(Database);


//var pageDatabase = new Database("Admin");
//console.log(pageDatabase);
module.exports = pageDB;