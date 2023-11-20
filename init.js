const mongoose = require('mongoose');
// importing the chat model form chat.js
const Chat=require("./models/chat.js")
main()
.then(()=>{
    console.log("connection is successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  } 
   let allchats=[
    {
        from:"nitesh",
        to:"amit",
        msg:"hi how are doing",
        Created_at: new Date(),
    },
    {
        from:"shyam",
        to:"amit",
        msg:"hi how are doing",
        Created_at: new Date(),
    },
    {
        from:"ram1",
        to:"amit",
        msg:"hi how are doing",
        Created_at: new Date(),
    },
    {
        from:"ram2",
        to:"amit",
        msg:"hi how are doing",
        Created_at: new Date(),
    },
   ]
  
  
  
  Chat.insertMany(allchats);
 