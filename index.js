const express=require("express");
const app=express();
const port =8080;

const path=require("path");
const  { v4: uuidv4 }=require('uuid');
const methodOverride=require("method-override");
app.use(express.urlencoded({extended:true}));// jobhi urlencoded data hoga ab express usko parse kar payega
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));// ysha hamne app.set ki jagah app.use ko apply kia to use the css property of style.css
app.get("/",(req,res)=>{     // y jab bhi koi search karega local host per example localhost:8080/    to yaha s response jayega 
    res.send("Server working well!");
})
app.use(methodOverride("_method"));
 
let posts=[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I love coding",
    },
    {
        id:uuidv4(),
        username:"Vishal",
        content:"Hard work is important to achieve success",
    },
    {
        id:uuidv4(),
        username:"iugigg",
        content:"oiiuoiuiuoiuoiiu",
    },
];
app.get("/posts",(req,res)=>{  // implementing GET to get data for all posts
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{// implementing POST to add new post
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id =uuidv4();
    posts.push({id,username,content}); //to add new content into the form 
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id); //jo id ham search karege y usko stored id s compaire karega 
                                        // ager id match hogai to result d dega
     res.render("show.ejs",{post});    // jo post chahia uski info show kardega user ko  
});

app.patch("/posts/:id",(req,res)=>{//use to change the content of the post
    let {id}=req.params;
    let newContent=req.body.content;// hamne yaha hoppscotch website ka use kia 
    let post =posts.find((p)=>id===p.id);//jis post m change karna h uski id hoppscotch per copy kardo
    post.content=newContent;             // or fir waha jo change karna h uska parameter do jaise content change karna h to content  fir value likho kyo likhna h
   
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;  // to edit the post we will also create a edit.ejs file
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post}); 
})

app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;  // yaha id extract hogi
    posts=posts.filter((p)=>id!==p.id);//jo purana posts variable h usi ki post filter karke assign karni h
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("Listening to port  : 8080");
});
