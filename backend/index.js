const express = require("express")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');


const cors = require("cors");
const { connection } = require("./config/db");
const {Usermodel} = require("./models/User.model")
const {Todorouter} = require("./middleware/Todorouter")
const {Authenticate} = require("./middleware/Authenticate")

const app = express();

app.use(cors())
app.use(express.json())


  // Base URL
app.get("/", (req, res)=>{
    res.send("This is base URL")
})
   // Signup - POST
app.post("/signup", (req,res)=>{
     const {email , password} = req.body;
     try {
        bcrypt.hash(password, 4,async function(err, hash) {
            // Store hash in your password DB.
            await Usermodel.create({email , password: hash})
            res.send({message : "User create successfully"})
        });
     } 
     catch (error) {
         console.log(error)
     }
})

  // Login - POST
  app.post("/login", async(req,res)=>{
    const {email , password} = req.body;
    const user = await Usermodel.findOne({email})
    if(!user){
         return res.send("User does not exist, Please create user")
    }
    const hash = user?.password

    bcrypt.compare(password, hash, function(err, result) {
        // result == true
         if(result){
            var token = jwt.sign({ UserID : user._id }, 'secret');
            console.log(token)
            res.send({message : "User logged in successfully" , token: token})
         }
         else{
             res.send({message:"Login Failed"})
         }
    });
})

app.use(Authenticate)

app.use("/todo", Todorouter)



app.listen(8080, async()=>{
     try {
        await connection
        console.log("Connected to DB")
     } catch (error) {
        console.log(error)
     }

     console.log("Listening on port 8080")
})