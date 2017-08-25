const mongoose = require('mongoose');
const projectObj = require("./projectSchema"); 
const projectSchema = projectObj.projectSchema;
const projectModel = projectObj.model;
var Schema = mongoose.Schema;
var pageSchema = new Schema({
    title:{
        type:String,
        required:[true ,'title is required'],
        default: this.title
    },
    name:{
        type:String,
        unique:true,
        required:[true, "the page name for this page is required"],
        default:this.name
    },
    routeUri:{
        type:String,
        required:true,
        unique:true,
        default:this.routeUri
    },
    projects:[{
        type:Schema.Types.ObjectId, ref:projectSchema
    }],
    navigation:{

    },
    fileUrl:{
        type:String,
        required:[false, "the file url is requred"],
        default:this.fileUrl
    },
    lastUpdated:{type:Date, default:Date.now, required:[true, 'the last updated Date is required']},
    _mongoID: {type:Schema.Types.ObjectId, description:"mongoDB's Unique ID"},
    staticFiles:{
        css:{
            type:Array,
            url:{
                type:String
            }
        },
        js:[{
            type:Array,
            url:{
                type:String
            }
        }],
        html:[{
            url:{
                type:String
            }
        }],
        img:[{
            type:Array,
            imgID:{
                type:String
            },
            imgUrl:{
                type:String
            }

        }]
    },
});
var validAttributes={}

module.exports = pageSchema;