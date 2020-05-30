const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/charity',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Mongodb is connected')
}).catch(err=>console.log(err));