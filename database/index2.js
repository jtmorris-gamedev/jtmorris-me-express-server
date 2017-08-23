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
var mongoDBConnectionURIWithAuth = `mongodb://[${mongoDBUser}:${mongoDBPassword}]@${mongoDBIP}/${mongoDBName}`;
var mongoDBConnectionURI = `mongodb://${mongoDBIP}/${mongoDBName}`;
var conn = mongoose.createConnection(mongoDBConnectionURI,{useMongoClient:true})
    .on('connected',function(){
        console.log("connected to database");
    });





//Get the default connection

// import the list of valid attributes from attributes file. will be manually validated for now
//db.attribList = require('./attributes');
// set up database models

//db.model('Page'); 

const connect = function(databaseName, userName, password, schemaName, schemaObject ,callback, protocol,mongoDBIP, port,authSource){
    if(protocol===undefined){
        console.log("on call to db.connect: protocol is undefined. assuming mongodb://")
        protocol = "mongodb://";
    }
    else if(mongoDBIP === undefined){
        console.log("on call to db.connect: ip address is undefined. assuming localhost");
        mongoDBIP = "127.0.0.1"
        
    }
    else if(options === undefined){
        console.log("on call to db.connect: no options specified. assuming default option authsource=\"admin\"")
        authSource = "admin";
    }
    else if(callback === undefined){
        //throw new Error("error on db.connect: the callback function is unspecified");
    }
    if(databaseName){
        if(userName){
            if(password){
                var conn =  mongoose.createConnection(`${mongoDBProtocol}${userName}:${password}@${mongoDBIP}/${databaseName}?authSource=${authSource}`,{useMongoClient:true})
                .on('connected',function(){
                    console.log(`the user ${userName} successfully connected to database ${databaseName}`);
                });
                //set the model for the connection if specified. if not
                
                
            }
            else{
                throw new Error(`on call to db.connect: the password is required for the user ${userName}`)
            }
        }
        else{
            throw new Error(`on call to db.connect: the username is requred. got the value: ${username} for username`)
        }
    }
    else{
        throw new Error(`on call to db.connect: the database name is required. got the value ${username} for username`);
    }
    return conn;


}

//var conn= connect("jtmorris-me", "Admin", "GTx79^zwQ");

var pageModel = conn.model('PageTest',pageSchema);



var ReadCallback = function(err,doc,){
    var result = {};
    if(err){
        console.error.bind(console,err);
    }
    else{
        return doc;
    }
}
//Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));


db.checkIfExists = function(model ,attribName, value, callback){
    
    return new model.where(attribName)
    .gt(value).exists(true);
    console.log("result of checkIfExists:");
    console.log(result)
    return result;

}
db.update = function(type, options, callback){

}
db.delete =function(type, options, callback){

}
db.create = function(Model,options = {}, onSuccess = function(doc){}, onError = function(err){},onSave = function(err,Model){},onClose = function(){}){
    //add authentication
    //get required options from model


    var newDocument = new Model(options);
    validationError = newDocument.validateSync();
    if(validationError){
        console.log("on create: validation error:" + validationError);
    }
    else{
    // if mongodb is ready and the connection is active and the information given is valid, and the user saving the information has been authenticated, then save
        newDocument.save(function(err,newDocument){
            if(err) return console.log(err);
            else return newDocument;
        });
    }
}

db.search = function(){

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
    


    if(query === undefined){
        model.find({},callback());
    }
    else {
        model.findOne(query, delimiterString, callback(err,data));
    }
    
}


var findPages = function(error,data,res){
    return function(err,data){
        if(err){
            console.log(err);
            return;
        }
        console.log("my pages are in\n" + data );
    }
}






console.log(db.read(pageModel,{},function(err,data){
    return function(err,data){
        if(err){
            console.log(err)
            console.error.bind(console,error);
            return;
        }
        console.log(data);


    }
}));





//console.log(results[0] + new Date(Date.now()));


//console.log(db.read(pageModel,"pageName","index").schema.tree);
module.exports = [db,conn];