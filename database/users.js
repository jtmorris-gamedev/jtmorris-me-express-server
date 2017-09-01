"use strict";
var mongoose = require("mongoose");
var Database = require("./baseClasses/databaseBase.js");
var userSchema = require("./schemas/userSchema.js");
var passport = require('passport');
//var userdatabase = new Database("Admin", "GTx79^zwQ",)
var userDB = new Database("Admin", "GTx79^zwQ","jtmorris-me", "users", userSchema);
var userModel = userDB.model;
var validAttribs = userDB.model.generateValidAttributes();


//set up passport with passport-local-mongoose
passport.use(userModel.createStrategy());
var testUser = new userDB.model();
testUser.setUsername("theMasterOfDisaster");
userDB.model.register(
    testUser,
    "someRandomPassword",function(err,user){
        if(err){
            console.log(err);
        }
        if(user){
            console.log("registering user:")
            console.log(user);
            
        }
        user.save(function(err,doc){
            if(err) console.log(err);
            else console.log(doc);
        });

    }
);

userDB.findUser = function findUser(query,callback){
    var primaryKeys= {};
    

    
    if(typeof(query)==="object"){
        query.filterBy = query.filterBy || "";
        query.lean = query.lean || false;
        query.sortOrder = query.sortOrder || validAttribs.sortOrder.asc
        if(query.primaryKeys){
            for(var primaryKey in query.primaryKeys){
               if(validAttribs.primaryKeys[primaryKey]){
                    primaryKeys[primaryKey] = query.primaryKeys[primaryKey];
                }
                else{
                    console.log("on find user: the primary key \"" + primaryKey+"\" is not in the list of valid primary keys. ignoring...")
                }
  
            }
            if(Object.keys(primaryKeys).length === 0 ){
                console.log("info: on findUser: the primary keys object is empty. currently this will act like a findAll");
            }

        }
        else{
            console.log("on findUser: query.primarykeys is undefined")
        }
        
       userDB.model.findOne(primaryKeys,filterBy).sort(sortOrder);
    }
    else{
        throw new TypeError("on findUser: query is of type " + typeof(query) + ". expecting type Object")
    }
 

}
userDB.createUser = function createUser(newUser,saveCallback,validateCallback){
    validateCallback = validateCallback || function validateCallback(opt1,opt2){
        if(opt1){
            console.log(opt1);
        }
        if(opt2){
            console.log(opt2);
        }
    }
    var newUser = new userDB.model(newUser)
    newUser.validate(validateCallback)
    //newUser.validate
    

}



//module.exports.userDatabase=userDatabase;
module.exports = {
    userDB:userDB,
    passport:passport

    
    
};