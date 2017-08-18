const mongoose = require('mongoose');


var Schema = mongoose.Schema;
var projectSchema = new Schema({
    name:{
        type:String,
        required:[true, "the name of this project is required"]
    },
    _ID:{
        type:Schema.Types.ObjectId, required:[true, "the Unique ID for this Project is required"]
    },
    frameworksUsed:{
        name:{

        },
        description:{

        },
        comments:{

        }
        
    },
    languagesUsed:[{
        
        name:{
        },
        description:{
          
        },
        comments:{
                     
        }
    }],
    projectContent:{
      demo:{

      }  
    }
});

module.exports = mongoose.model('projectSchema', projectSchema);