const mongoose = require('mongoose');
const projectObj = require("./projectSchema"); 
const projectSchema = projectObj.projectSchema;
const projectModel = projectObj.model;
var Schema = mongoose.Schema;
var pageSchema = new Schema({
    pageExtension:{
        type:String,
        default:"html"
    },
    publicFileRoot:{
        type:String,
        default:"/dist/"
    },
    testAttribute:{
        type:String
    },
    title:{
        type:String,
        required:[true ,'title is required']
    },
    pageName:{
        type:String,
        required:[true, "the page name for this page is required"]
    },
    routeUri:{
        type:String
    },
    projects:[{
        type:Schema.Types.ObjectId, ref:projectSchema
    }],
    fileUrl:{
        type:String,
        required:[true, "the file url is requred"],
        default:this.publicFileRoot + this.pageName
    },
    webUrl:{
        type:String
    },
    pageID:{
        type:Number,
        requred:[true,"pageID is required"]
    },
    lastUpdated:{type:Date, default:Date.now, required:[true, 'the last updated Date is required']},
    _mongoID: {type:Schema.Types.ObjectId, description:"mongoDB's Unique ID"},
    staticFiles:{
        css:[{
            type:Array,
            url:{
                type:String
            }
        }],
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

            }

        }]
    }
});
module.exports = mongoose.model('pageSchema', pageSchema);