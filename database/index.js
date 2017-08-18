//setup the mongoose object
var mongoose = require('mongoose');
//import the database models
var dbModels = require('./schemas');

var pageModel = dbModels.pageModel;
var projectmodel = dbModels.projectModel

//Set up default mongoose connection with updated function and useMongoClient:true
var mongoDB = 'mongodb://127.0.0.1/test';
var db = mongoose.createConnection(mongoDB,{
    useMongoClient:true
});

//Get the default connection
var db = mongoose.connection;
// import the list of valid attributes from attributes file. will be manually validated for now
db.attributeList = require('./attributes');
db.pageAttributes = db.attributeList.pages




//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('success', console.debug.bind(console,"the connection was successful"));


/*var sectionSchema = new Schema({
    _ID:{
        type:Schema.Types.ObjectId, required:[true,"the section's unique ID is required"]
    },
    title:{
        type:String,
        required:[true, "the Section's Title is Required. was given: +" + this.title]
    },
    intro:{

    },
    project:{
        _ID:{
            
        }
    }

});
*/

/*pageModelInstance1 = new pageModel({
    title:"Welcome To My Mean Stack app!",
    pageName:"index",
    pageExtension:"html",
    webUrl:"/",
    routeUri:"/",
    staticFiles:{
        html:[
            this.fileUrl
        ],
        css:[
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"

        ]
    },
    pageID:1

}).update(function(err){
    if(err){
        return console.log(err);
    }
    else{
        console.log("creation Of page Model instance success");
    }
});
*/
db.get = function(attributeName, value, callback){
    //check if the connection is valid
    var result;
    if(attributeName === undefined){
         //for some reason attribute name is undefined.
         throw new TypeError("database: on performing operation db.get() the argument attributeName was undefined. aborting!");
         //throw an error and abort the operation
    }
    else{
       if(value === undefined){
            //if data is undefined assume user wants to query based on attribute only   
            console.log("database:  on performing operation db.get("+attributeName+","+value+"), value was undefined. Attempting to query based on attribute only");
            result = pageModel.where(attributeName);
        }
        else{
            console.log("database: performing operation on database! db.get("+attributeName +","+value+")");
            result = pageModel.where(attributeName,value);
        }
    }
    //console.log(result);
}

//test db.get 
//db.get(db.attributeList.pageName,"index");
db.getPageByName = function(type,pageName, callback){

}
db.checkIfExists = function(type, options, callback){

}
db.update = function(type, options, callback){

}
db.delete =function(type, options, callback){

}
db.create = function(type,options, callback){

}
db.read = function(type, options, callback){

}
db.switchDatabase = function(){

}
db.search = function(){

}
module.exports = {mongoose:mongoose,mongoDB:mongoDB,db:db,}