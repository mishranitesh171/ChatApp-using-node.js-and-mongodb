const mongoose = require('mongoose');
//creating schema 
const chatschema=new mongoose.Schema({
    from:{
        type:String,
     required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
      maxLenght:50,
    },
    Created_at:{
        type:Date,
        required:true
    }
    });
    // making model or you can say collection for chat
    const Chat=mongoose.model("Chat",chatschema);
    
    module.exports=Chat;