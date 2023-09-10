const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:String,
    role:String,
    phone:String,
    address:String
})

module.exports =  mongoose.model("employees", UserSchema)