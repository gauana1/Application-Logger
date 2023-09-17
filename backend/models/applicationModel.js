const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema  = new Schema({
    jobName:{
        type:String,
        required:true
    },
    position:{
        type:String, 
        required:true
    }, 
    applicationLink:{
        type:String, 
        required:true
    }, 
    status:{
        type:String,   
        required:true
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    notes:{
        type:String
    },
    user_id:{
        type:String, 
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('Applications', applicationSchema);