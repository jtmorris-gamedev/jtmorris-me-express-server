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
var mongoDBName = "test"
var mongoDBUser="admin"
var mongoDBPassword = "GTx79^zwQ"
var db = {};
var mongoDBConnectionURIWithAuth = `mongodb://[${mongoDBUser}:${mongoDBPassword}]@${mongoDBIP}/${mongoDBName}`;
var mongoDBConnectionURI = `mongodb://${mongoDBIP}/${mongoDBName}`;
var conn = mongoose.createConnection(mongoDBConnectionURI,{useMongoClient:true})
    .on('connected',function(){
        console.log("connected to database");
    });
var pageModel = conn.model('PageModel',pageSchema);




//Get the default connection

// import the list of valid attributes from attributes file. will be manually validated for now
//db.attribList = require('./attributes');
// set up database models

//db.model('Page'); 







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
var read = function(query, delimiterString, model = pageModel, res){
    var findPages = function(res){
        return function(err,data){
            if(err){
                console.log(err);
                return;
            }
            console.log("my pages are in\n" + data );
        }
    }
    if(query === undefined){
        model.find({},findPages(res));
    }
    else {
        model.findOne(query, delimiterString, findPages(res));
    }
    
}
db.read = read;
console.log(read({"pageName":"index"},"pageName title lastUpdated"));


//console.log(results[0] + new Date(Date.now()));


//console.log(db.read(pageModel,"pageName","index").schema.tree);
module.exports = [db,conn];