var mongoose = require('mongoose');
var schemas = require("./schemas")
var pageModel = mongoose.model('pageSchema',schemas.pageSchema)
var projectModel =schemas.projectSchema;


//create a list to store all the valid attributes per each kind of model for global use
var attribList = {};
attribList.pages = {}; 
attribList.projects = {};

//attribList.pages;
//    pages:{},
//    projects:{}
//get all the properties off of the page model and populate them into an object list
for(var path in pageModel.schema.paths){
    attribList.pages[path.toString()] = path
}
for(var path in projectModel.schema.paths){
    attribList.projects[path.toString()] = path
}

//log all attributes in list

module.exports = attribList;