const express=require("express");
const app=express();

var methodOverride = require("method-override")

let port =8080;
const mongoose = require('mongoose');
const path=require("path")
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
// to add extenal css and js file use this syntax
app.use(express.static(path.join(__dirname,"public")))

//parseing the data means data sent by client come to server in url or jason form so to make readable by database we convert using this
app.use(express.urlencoded({extended:true}))
// yaha small mi method likh jab site pe capital mi diya hua hai 
app.use(methodOverride("_method"))
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
//starting server
app.listen(port,()=>{
    console.log(`server is listening at port ${port}`)
})
app.get("/",(req,res)=>{
    res.send("root is working")
})
//index route to show all data 
app.get("/chats", async(req,res)=>{
    // this will bring all chat from database
let chats= await Chat.find();

    res.render("index.ejs",{chats})
})
app.get("/chats/new",( req,res)=>{
res.render("new.ejs")
}
)
//create route to post data in to data base
app.post("/chats",(req,res)=>{
//destructuring object
let{from,to,msg}=req.body;
let newchat=new Chat({
    from:from,
    to:to,
    msg:msg,
    Created_at:new Date()
})
// saving the chat in database
newchat
.save()
.then((res)=>{
    console.log("chat was saved")
})
.catch((err)=>{
    console.log(err)
})

res.redirect("/chats")

})
//upading the chat route
app.get("/chats/:id/edit",async( req,res)=>{
    let {id}=req.params
    let chat= await Chat.findById(id)
    res.render("edit.ejs",{chat})
    }
    )


 app.put("/chats/:id",async( req,res)=>{
        let {id}=req.params;
        let {msg:newmsg}=req.body;
        console.log(newmsg)
        let updatechat= await Chat.findByIdAndUpdate(
            id ,
            {msg:newmsg},
            {runValidators:true ,new:true}
            )
        console.log(updatechat)
       res.redirect("/chats")
        }
        )
        // destroy route
        app.delete("/chats/:id",async(req,res)=>{
            let {id}=req.params;
         let chatTobeDeleted= await  Chat.findByIdAndDelete(id)
       console.log(chatTobeDeleted)
       res.redirect("/chats")
        })



