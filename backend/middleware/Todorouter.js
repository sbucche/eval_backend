const express = require("express")
const {Todomodel} = require("../models/Todo.model")
const Todorouter = express.Router();

Todorouter.get("/", async(req,res)=>{  
     const todos = await Todomodel.find()
     res.send({"todo": todos})
})


Todorouter.post("/create", async(req,res)=>{  
     const {taskname, status  , tag} = req.body
     const created_By = req.UserID;
     const todos = await Todomodel.create({taskname, status  , tag, created_By})
     res.send({"todo" : todos})
})

Todorouter.patch("/:todoID", async(req,res)=>{  
    const todoId = req.params.todoID
    console.log(todoId)
    const payload = req.body;
    const created_By = req.UserID
    console.log(created_By)
    const todo = await Todomodel.findOne({_id: todoId})
    console.log(todo)
    console.log(todo?.created_By)
    if(todo?.created_By !== created_By){
        res.send({"message":"you are not authorise"})
    }
    else{
        await Todomodel.findByIdAndUpdate(todoId, payload)
        res.send({"message": "Todo update successfully"})
    }

})

Todorouter.delete("/:todoID", async(req,res)=>{  
    const todoId = req.params.todoID
    
    const created_By = req.UserID
    const todo = await Todomodel.findOne({_id: todoId})
    console.log(todo)
    console.log(todo?.created_By)
    if(todo?.created_By !== created_By){
        res.send({"message":"you are not authorise"})
    }
    else{
        await Todomodel.findByIdAndDelete(todoId)
        res.send({"message": "Todo delete successfully"})
    }

})














module.exports = {Todorouter}