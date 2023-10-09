const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    taskname: {type : String , required: true},
    status: {type : String , required: true},
    tag : {type : String , required: true},
    created_By : {type: String , required : true}
})

const Todomodel = mongoose.model("todo", todoSchema);

module.exports = {Todomodel}