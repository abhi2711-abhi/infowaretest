const mongoose = require("mongoose")

const orderSchema  = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    price:{
        type: String,
        required: true,
    },

    orderdate:{
        type: Date, 
        required: true, 
        default: Date.now
       
    },

    
})

const Order = new mongoose.model("Order", orderSchema);
module.exports = Order