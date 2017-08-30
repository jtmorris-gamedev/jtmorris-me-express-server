var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema(
    {
        dateJoined:{
            type:Date,
        },
        lastUpdated:{
            type:Date,
            default: new Date(Date.now())
        },
        username:{
            type:String,
            requred:true
        },
        fName:{
            type:String,
            required:true
        },
        mName:{
            type:String,
            required:true
        },
        lName:{
        type:String,
            required:true
        },
        emails:{
            type:Array,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        address:{
            line1:{

            },
            line2:{

            },
            city:{

            },
            state:{

            },
            zip:{

            },
            country:{

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
                type:Boolean
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
                userName:{
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


userSchema.schemaName = 'user';


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


userSchema.statics.getAllUsers = function getAllUsers (callback){
    console.log("this.model=" +this.model);
}






module.exports = userSchema;