const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'basic',
        enum:["basic","admin"]
    },
    is_activated:{
        type:Boolean,
        default:0
    },
    date:{
        type:String,
        default:Date.now
    }

});
const User= mongoose.model('User', UserSchema);

module.exports = User;