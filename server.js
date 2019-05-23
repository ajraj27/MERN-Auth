require("dotenv").config()
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const path = require("path")

const users = require("./routes/api/users");

const app=express();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "public")))

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/AuthApp", { useNewUrlParser: true })
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));


app.use("/routes/api/users", users);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

app.listen(process.env.PORT || 5000,() => {
    console.log("App started.");
})
