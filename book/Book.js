const mongoose = require("mongoose")

//Model

mongoose.model("Book", {
    // Title, Author, numberPages, publisher
    title: {
       type: String,
       required: true
    },
    author: {
        type: String,
        required: true
     },
    pages:{
        type: Number,
        required: false
     },
     publisher: {
         type:String,
         required: false
     }
    })