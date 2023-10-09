const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
     email: {type: String, required: true , unique: true},
     password: {type: String, required: true}
})

const Usermodel = mongoose.model("user", userSchema)

module.exports = {Usermodel}