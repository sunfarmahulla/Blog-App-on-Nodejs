const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    titleName:{
        type:String,
        require:true
    },
    dateofPost:{
        type:Date,
        require:true
    },
    titleImage:{
        type:String,
        require:true
    },
    headerImage:{
        type:String,
        require:true
    },
    discription:{
        type:String,
        min:200,
        max:5000000,
    }


}, {collation:'post'});

// postSchema.path("discription").validate((val)=>{
//     return val.length>250;
// },"Discription should be greater than 250")

const Post=mongoose.model('Post',postSchema);

module.exports =Post;