const express=require("express");
const mongoose=require("mongoose");
// const bodyparser=require("body-parser");
const path=require("path");

const app=express();
const port=80;

// Express stuff
app.use("/static",express.static("static"));
app.use(express.urlencoded({extended:false}));//middleware for request handling and parsing
// app.use(express.json());//middleware for request handling and parsing

// PUG stuff
app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"));

//Mongoose specific task
mongoose.connect("mongodb://localhost:27017/contact");
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"))
const contactschema=new mongoose.Schema({
    name:String,
    email:String,
    phone:Number
})
const Contactmodel=mongoose.model("Contact",contactschema);

// Endpoints
app.get("/",(req,res)=>{
    res.status(200).render("home.pug");
})
app.get("/contact",(req,res)=>{
    res.status(200).render("contact.pug");
})
app.get("/thnks",(req,res)=>{
})
app.post("/contact",(req,res)=>{
    // res.status(200).render("contact.pug");
    // console.log(req.body)
    var mydata= new Contactmodel(req.body)
    mydata.save().then(()=>{
        console.log("Item saved")
        // res.send(`Items send ${[req.body]} and they are saved`)
        // const details={"Name":req.body.name,"Email":req.body.email,"number":req.body.numeber};
        const details=req.body
        console.log(details)
        const params={"contact_details":details}
        res.status(200).render("thnks.pug",params);
    
        
    })
})

// START the SERVER
app.listen(port,()=>{
    console.log(`Application started  on port${port}`);
})
