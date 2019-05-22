const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

const users = require("./routes/api/users");

const app=express();



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/AuthApp", { useNewUrlParser: true })
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));


app.use("/routes/api/users", users);


app.listen(5000,() => {
    console.log("App started.");
})