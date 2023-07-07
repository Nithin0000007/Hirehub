const mongoose = require('mongoose');

const notiSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:String,
    author:String
})

module.exports = mongoose.model("notification",notiSchema);