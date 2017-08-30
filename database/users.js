"use strict";
var Database = require("./databaseBase.js");
var userSchema = require("./schemas/userSchema");
//var userdatabase = new Database("Admin", "GTx79^zwQ",)
var userDB = new Database("Admin", "GTx79^zwQ","users", userSchema);

console.log(userDB);


//const userDatabase = new Database("Admin","GTx79^zwQ","users","user",userSchema);
/*var userModel = userDatabase.model;
userModel.createUser({
    username:"jtmorris",
    password:"dummyPassword",
    emails:[
        "jthecybertinkerer@gmail.com"
    ]
});
*/
//module.exports.userDatabase=userDatabase;
module.exports = userDB;