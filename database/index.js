"use strict";
//setup the mongoose object
var mongoose = require('mongoose');
var connReady = require('mongoose-connection-ready');
//import the database models
var projectSchema = require('./schemas/projectSchema');
var pageSchema = require('./schemas/pageSchema');

//Set up default mongoose connection with updated function and useMongoClient:true
var mongoDB = 'mongodb://127.0.0.1/test';
var mongoDBProtocol = "mongodb://"
var mongoDBIP="127.0.0.1"
var mongoDBName = "jtmorris-me"
var mongoDBUser="admin"
var mongoDBPassword = "GTx79^zwQ"
var db = {};

//create a base database object to assist with creating connections
class Database{
    constructor(/*string*/ userName, password, dbName, dbModelName, dbSchema, authSource, hostAddress){
        //import mongoose context for local use
        const mongoose = require('mongoose');
        if(typeof(userName) === "string"){
            this.userName = userName;
        }
        else{
            throw new TypeError("error on creation of Database object: userName Argument is " + typeof(userName) + ". expected a String" )
        }
        if(typeof(password) === "string"){
            this.password = password;
        }
        else{
            throw new TypeError("error on creation of Database object: password Argument is " + typeof(password) + ". expected a String" );
        }
        if(typeof(dbName) === "string"){
            this.dbName = dbName;
        }
        else{
            throw new TypeError("error on creation of Database object: dbName Argument is " + typeof(dbName) + ". expected a String" );
        }
        if(typeof(dbSchema) === "object"){
            this.schema = dbSchema;
            if(typeof(dbModelName) ==="string"){
                this.modelName = dbModelName;
                this.model = mongoose.model(this.modelName, this.schema);
            }
            else{
                throw new TypeError("error on creation of Database object: dbModelName Argument is " + typeof(dbModelName) + ". expected an Object" );
            }
        }

        else{
            throw new TypeError("error on creation of Database object: dbSchema Argument is " + typeof(dbSchema) + ". expected an object" )
        }
    
        this.onConnecting = this.onConnecting || function onConnecting(msg){
            console.log(`making connection to database ${this.name} as user ${this.userName}\nMongo message:${msg}`);
        }
        this.onConncected = this.onConncected || function onConnected(msg, _this = this){
            console.log('this=');
            console.log(this)
            console.log("end this")
            console.log(`connection made to database ${this.name} as user ${this.user}\nMongo message:${msg}`)
        }
        
        this.onOpen = this.onOpen || function onOpen(msg){
            console.log(`opened connection to ${this.name} as user ${this.user}\nMongo message:${msg}`);
        }
        this.onDisconnecting = this.onDisconnecting || function onDisconnecting(msg){
            console.log(`closing connection to database: ${this.name}\nMongo message:${msg}`);
        }
        this.onDisconnected = this.onDisconnected || function onDisconnected(msg){
            console.log(`connection to database ${this.name} has been disconnected or lost.\nMongo message:${msg}`);
        }
        this.onReconnected = this.onReconnected ||function onReconnected(msg){
            console.log(`sucessfully reconnected to database ${this.name}\nMongo message:${msg}`);

        }  
        this.onClose = this.onClose || function onClose(msg, _this=this){
            console.log(`closed and disconnected from database ${this.name}.\nMongo message:${msg}`);
        }
        this.onError = this.onError || function onError(errMsg){
            console.log(`An error occured with the connection to database ${this.name} \nMongo error message:${errMsg}`);
        }
        this.authSource = authSource || "admin";
        this.hostAddress = hostAddress || "127.0.0.1"
        this.connectionUriWithAuth = `mongodb://${this.userName}:${this.password}@${this.hostAddress}/${this.dbName}?authSource=${this.authSource}`;
        this.connectionUriNoAuth = `mongodb://${this.hostAddress}/${this.dbName}?authSource=${this.authSource}`
        this.connection = this.connect(this.connectionUriNoAuth);
        this.connection.model(this.modelName);
    }
    connect(connectionUri){
        var connection = mongoose.createConnection(connectionUri)
        .on('connecting',this.onConnecting)
        .on('connected', this.onConncected)
        .on('open',this.onOpen)
        .on('disconnecting',this.onDisconnecting)
        .on('disconnected',this.onDisconnected)
        .on('close',this.onClose)
        .on('error',this.onError)
        .on("reconnected",this.onReconnected)
        return connection;
    }

} 




var mongoDBConnectionURIWithAuth = `mongodb://[${mongoDBUser}:${mongoDBPassword}]@${mongoDBIP}/${mongoDBName}`;
var mongoDBConnectionURI = `mongodb://${mongoDBIP}/${mongoDBName}`;
var conn = mongoose.createConnection(mongoDBConnectionURI,{useMongoClient:true})
    .on('connected',function(){
        console.log("connected to database");
    }).on('error',function(err){
        console.log(err);
    }).on('reconnect',function(msg){
        console.log("the database has been reconnected\n"+msg);
    });


var testDB2 = new Database("admin","GTx79^zwQ","test2","test2page",pageSchema);



//console.log("testDB2:");
//console.log(testDB2);



//Get the default connection

// import the list of valid attributes from attributes file. will be manually validated for now
//db.attribList = require('./attributes');
// set up database models

//db.model('Page'); 
const saveFunc = function(err,newDoc){
    return function(err,newDoc){

    
    if(err){
       console.log(err);
    }
    else return newDoc;

    }
}
const removeFunc = function(){

}


//var conn= connect("jtmorris-me", "Admin", "GTx79^zwQ");

var pageModel = conn.model('PageTest',pageSchema);



var ReadCallback = function(err,doc,){
    if(err){
        console.error.bind(console,err);
    }
    else{
        return doc;
    }
}
//Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.update=function(Model,primaryKey,newDoc,callback, options = {}, delimiterString){
    options.setDefaultsOnInsert =false;
   var err;
   var doc;
   var updatedDocument = new Model(newDoc);
   var validationError = updatedDocument.validateSync();
   if(newDoc === undefined){
       throw new Error("error on db.update: the newDoc argument is undefined");
   }
   else if(newDoc ==={}){
       throw new error("error on db.update: the newDoc argument is empty");
   }
   else if(Model === undefined){
       throw new Error("error on db.update: the model argument is undefined");
   }
   if(validationError){
    console.log("on db.update: validation error:" + validationError);
    }
    else{
        Model.findOne(primaryKey,saveFunc);
    }
}


db.delete =function(Model, query, callback){
    var err;
    if(Model){
        if(primaryKey){
         
        Model.findOneAndRemove(primaryKey,callback(err));
        }
        else{
            throw new Error("error on db.delete: primarykey is undefined");
        } 
    }
    else throw new Error("Error on db.delete:model is undefined");
    


}
db.save = function(Model,query,newDoc,callback,primaryKey){
    //add authentication
    //get required options from model
    var err;
    var doc;
    
    newDoc = new Model(newDoc);
    var validationError = newDoc.validateSync();
    if(validationError){
        console.log("on create: validation error:" + validationError);
    }
    else if(query ==={}){
        throw new Error("error on save: empty object given to query, which is not allowed");
    }
    else if(callback){
         //Model.findOneAndUpdate(query, newDoc, {upsert:true,new:true,setDefaultsOnInsert:true},callback(err,doc));
         /*
            on the document: find to see if it exists
            if it exists, then update the fields given
            if some fields are not given, then just set them to themselves


         */
        Model.find(query,function(err,doc){
            return function(err,doc){
                console.log(doc);
                if(doc._id === newDoc._id || doc[primaryKey] ===newDoc[primaryKey]){
                    //update doc
                    for(var property in query){
                        doc[property] = query[property];
                        doc.save(callback(err,doc));
                    }
                }
                else{
                    //else save the new document
                    newDoc.save(function(err,doc){
                        if(err) console.log(err);
                        else return doc;
                    });
                }


            }
        })
    }
    else{
    // if mongodb is ready and the connection is active and the information given is valid, and the user saving the information has been authenticated, then save
    console.log("callback = " + callback);
    }
}

db.read = function(model, query, callback, delimiterString, ){
    var err;
    var data;
    if(!model){
        throw new Error("error while calling db.read. model is of type" + typeof(model)+". expected mongoose model");
    
    }
    else if(!query){
        throw new Error("error while calling db.read. query is of type " + typeof(query) + ". expecting an object")
    
    }
    else if(!callback ||  typeof(callback) !== 'function'){
        throw new Error("error while calling db.read. callback is undefined or not a function was given data of type:" +typeof(callback));
    
    }
    else {
        model.find(query, delimiterString, callback(err,data));
    }
    
}


var findPages = function(error,data,res){
    return function(err,data){
        if(err){
            console.log(err);
            return;
        }
        console.log("my pages are in\n" + data );
        return data;
    }
}


pageModel.findOneAndUpdate({name:"about"},{
    name:"about",
    title:"about this website",
    routeUri:"/WhyIsMakingDatabaseCodeSoHard!"
},{upsert:true,setDefaultsOnInsert:true,new:true},function(err,doc){
    console.log("err:"+err);
    console.log(doc);
})

var test ={
    name:"contact",
    title:"the website information is here",
    routeUri:"/contactMe"
};



//console.log(db.read(pageModel,{"name":"contact"},findPages));
module.exports = [db,conn];