const express=require("express");
const app=express();
const port=8080;
const { v4: uuidv4 } = require('uuid'); //for generating id for specific post

var methodOverride = require('method-override') //for override the post with patch or delete
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended:true}));  //so that express can parse the data into readable format

app.set("view engine","ejs");   //is ke wajah se ab rnder kr paye ge ejs ko  "npm i ejs"
const path=require("path");
app.set("views",path.join(__dirname,"views")); //set path for views so that express can get the view folder
app.use(express.static(path.join(__dirname,"public")));  //set path for public so that exprss get the static files

// app.get("*",(req,res)=>{
//     res.send(" Route '/posts' -> for Main page ")
// })


//an array of posts
let posts=[
    {
        id:uuidv4(),
        username:"Numan",
        src:"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        caption:"Adventure is out there; don't let it wait too long."

    },
    {
        id:uuidv4(),
        username:"Anzar",
        src:"https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
        caption:"Chasing sunsets and dreams, one horizon at a time."

    },
    
]

// main page 
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

//for creating new post
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})


//;\pushing the post in an Array
app.post("/posts",(req,res)=>{
    let id=uuidv4();
    // console.log(req.params)

    let {username,src,caption}=req.body;
    console.log (req.body)
    posts.push({id,username,src,caption});
    res.redirect("/posts")


})

//for showing each post as "see more"

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("show.ejs",{post})
})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newCaption=req.body.caption;
    console.log(newCaption)
    let post=posts.find((p)=> id===p.id);
    post.caption=newCaption;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    // res.send("working!")
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
   posts=posts.filter((p)=> id !== p.id);
    res.redirect("/posts")
})




app.listen(port,()=>{
    console.log("Listening on port:8080");
})