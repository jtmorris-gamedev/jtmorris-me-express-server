var mongoose = require('mongoose');
var userAttribs ={
};
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

userSchema.statics.getAllUsers = function getAllUsers (callback){
    return this.model('user').find({},callback)
}



for(var attribute in userSchema.Schema.paths){
    userAttribs[attribute]=attribute.toString
}



module.exports = mongoose.model('userSchema', userSchema);