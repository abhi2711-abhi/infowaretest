const mongoose = require("mongoose")

const addaccountSchema  = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required:true,
        unique:true
    },

    password:{
        type: String,
        required: true,
        
    }
})

const Addaccount = new mongoose.model("account", addaccountSchema);
module.exports = Addaccount