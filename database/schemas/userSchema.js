var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
//var resources = require("./resources/getResources.js");

var userSchema = new mongoose.Schema(
    {
        dateJoined:{
            type:Date,
        },
        lastUpdated:{
            type:Date,
            default: new Date(Date.now())
        },
        active:{
            type:Boolean,
            default:false
        },
        username:{
            type:String,
            requred:true,
            unique:true,
            primaryKey:true
        },
        password:{
            type:String,
            required:true
            
        },
        salt:{
            type:String
        },
        name:{
            type:Object,
            required:true,
            first:{
                type:String,
                required:true,
                default:undefined
            },
            middle:{
                type:String,
                required:false
            },
            last:{
                type:String,
                required:true

            }


        },
        emails:{
            type:Array,
            required:true,
            unique:true,
            primaryKey:true

        },
       
        mobilePhone:{
            type:String,
            primaryKey:true
        },
        homePhone:{
            type:String,
            primaryKey:true

        },
        workPhone:{
            type:String,
            primaryKey:true

        },
        address:{
            required:false,
            type:Object,
            line1:{
                type:String,
                required:true

            },
            line2:{
                type:String,
                required:false

            },
            city:{
                type:String,
                required:true

            },
            state:{
                type:String,
                required:true

            },
            zip:{
                type:String,
                required:true,
                minLength:5,
                maxLength:10

            },
            country:{
                type:String,
                required:true

            }

        },
        settings:{ // save this for custom user settings
            isWebsiteAuthor:{
                type:Boolean,
                default:false
            },
            displaySocialMedia:{
                type:Boolean,
                default:true,
            },
            isAdmin:{
                type:Boolean,
                default:false
            }
        },
        gameData:{ //find a structure to save game data for user or use cookie.

        },
        socialMedia:{
            facebook:{
                username:{

                },
                profileUrl:{

                },
                authKey:{

                }
            },
            twitter:{
                username:{
                    type:String
                },
                profileUrl:{
                    type:String
                    
                },
                authKey:{
                    type:String
                }

            },
            google:{
                username:{
                    type:String

                },
                profileUrl:{
                    type:String

                },
                authKey:{
                    type:String

                }

            },
            linkedIn:{
                username:{
                    type:String
                },
                profileUrl:{

                },
                authKey:{
                    type:String
                }

            },
            github:{
                username:{
                    type:String

                },
                profileUrl:{
                    type:String

                },
                authKey:{
                    type:String

                }
            },
            utils:{
                type:Object,
                __result:{
                    type:Object
                }
            },
            freeCodeCamp:{
                username:{
                    type:String

                },
                profileUrl:{
                    type:String

                },
                authKey:{
                    type:String

                }

            }
        }
    }
)


userSchema.statics.schemaName = 'user';

//apply the passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose)

//create ways to set model info on the fly like in userbase.

//idea: if no parameter is provided return the result in question

//ex function firstname() returns firstname. else function firstname(firstname) sets the name
// chain getter methods with the end of get result
userSchema.methods ={
    utils:{
        __setupName: function __setupName(){
            this.name = this.name || {
                first:undefined,
                middle:undefined,
                last:undefined
            }
            return this.name   
        },

            //store the result variable as this.__result because setting this.utils.__result doesnt work
        __setupResult: function __setupResult(){
            this.__result = {}
            /*for(var path in this.schema.paths){
                //resolve case where path could be a string
                if((typeof(path) === 'string')&& (path.includes("."))){
                    let tempPath = path;
                    var level = 0;
                    var pathArray=[];
                    var currentResult = this.__result
                    while(tempPath.includes(".")){
                         
                        var nextPath = tempPath.substr(tempPath.indexOf(".")+1,tempPath.length);
                        var currentPath =tempPath.substr(0,tempPath.indexOf("."))
                        if(currentPath.includes(".")){
                            pathArray[level] = currentPath;
                            this.__result[CurrentPath][nextPath] = undefined;
                        }
                        if(!nextPath.includes(".")){
                                pathArray[level+1] = nextPath
                        }
                        


                        tempPath = tempPath.substr(tempPath.indexOf(".")+1,tempPath.length);
                        level++

                    }


                    let tempSubpath = path.substr(path.lastIndexOf(".")+1,path.length);

                    this.__result[tempPath] =({}[tempSubpath] = undefined);
                    /*

                    i want to express the following
                    __result[tempPath]={
                        tempSubPath = undefined
                    }
                    then
                    _result[tempPath][tempSubpath]=undefined;
                    
                }
                //this.__result[path] = undefined;
            } */

            return this.__result;
        },
        __setupAddress : function __setupAddress(){
            this.address = this.address || {
                    line1: undefined,
                    line2: undefined,
                    city:  undefined,
                    state: undefined,
                    country: undefined,
                    zip: undefined,
            };
            return this.address
        }

    },
    setupProperties:function setupProperties(){
        this.name = this.name || this.utils.__setupName;
        this.address = this.address || this.utils.__setupAddress;
        this.utils.__result = this.utils.__setupResult() 
        return this;
    },
    getName:function getName(){
        
       this.__result['name'] = this.name
       return this;
    },
    setFirstName: function setFirstName(firstName){
        //if this.name === undefined then set it up
        this.name.first = this.name.first || firstName;
        //this.name.first = name;
        return this;
    },
    getFirstName: function getFirstName(){
        this.__result.name.first = this.name.firstName
        return this;
    },
    setMiddleName: function setMiddleName(middleName){
        //if this.name === undefined then set it up
        this.name.middle = this.name.middle || middleName;
        //this.name.first = name;
        return this;
    },
    getMiddleName: function getMiddleName(){
        this.__result.name.middle = this.name.middle;

    },
    setLastName: function setLastName(lastName){
        //if this.name === undefined then set it up
        this.name.last = this.name.last || lastName;
        //this.name.first = name;
        return this;
    },
    setAddress:function setAddress(addressObj){
        //check if object literal
        //set appropriate values
        //return this
        this.address = addressObj;
        return this;
    },
    getAddress:function getAddress(){
            console.log(this.__result)
            this.__result.address = this.address;
            return this
    },
    setLine1 : function line1(line1){
        this.address.line1 = this.address.line1 || line1
        return this;
    
    },

    getLine1:function getLine1(){
        this.__result.address.line1 = this.address.line1;
    },
    

    setLine2 : function line2(line2){
        this.address.line2 = this.address.line2 || line2;
        return this;
    },
    setCity : function city(city){
        //if US city, then check the list of cities
        this.address.city = this.address.city || city;
        return this;
    },
    setState : function state(state){
        this.address.state = this.address.state || state
        return this;
    },
    setZip : function zip(zip){
        this.address.zip = this.address.zip || zip
        return this;
    },
    setCountry : function country(country){
        //TODO: check country against list of countries for validation purposes
        this.address.country = this.address.country || country;
        return this;
    },
    setUsername:function setUsername(username){
        //TODO: provide username validation
        this.username = username
    },
    getUsername:function username(){
        this.__result.username = this.username;
        return this;

    }
}

//add helper methods to set Address for ease of use (hopefully!)
//use the opportunity of these methods to implement some validation!

userSchema.statics.createUser = function createUser(userInfo){
    //get user information
        model = this.model(this.schemaName);

    
    //verify information is correct
    //create the user





    //return the user. 
    
}



//var userModel = mongoose.model('user', userSChema) 



userSchema.statics.defaultReadCallback = function defaultReadCallback(err,data){
    this.model
    return function(err,data){
        if(err) console.log(err); 
        console.log("heres the data:" +data)
        return data;
    }
}
userSchema.statics.generateValidAttributes = function generateValidAttributes(){
    //create variable to store the valid attributes
    var validAttribs={};
    validAttribs.reqired = {}
    //create attribute to store the list of primary keys
    validAttribs.primaryKeys = {};
    for(var path in this.schema.paths){
        validAttribs[path] =this.schema.paths[path]
        if(this.schema.paths[path].options.primaryKey){
            validAttribs.primaryKeys[path] = path;
        }
        else if(this.schema.paths[path].options.required){
            validAttribs.reqired[path] = path;
        }

    }
    validAttribs.sortOrder ={
        asc:"ascending",
        dsc:"descending"
    }
    
    return validAttribs;
}

userSchema.statics.getAllUsers = function getAllUsers (callback){
    console.log("this.model=" +this.model);
}






module.exports = userSchema;