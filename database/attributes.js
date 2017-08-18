var pageModel = require("./schemas/pageSchema");
var projectModel = require("./schemas/projectSchema");
console.log("logging pageModel.schema.paths:\n");


//create a list to store all the valid attributes per each kind of model for global use
var attributeList = {
    pages:{},
    projects:{}
}
//get all the properties off of the page model and populate them into an object list
for(var path in pageModel.schema.paths){
    attributeList.pages[path.toString()] = path
}
for(var path in projectModel.schema.paths){
    attributeList.projects[path.toString()] = path
}

//log all attributes in list

module.exports = {attributeList:attributeList};