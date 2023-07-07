const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNo:Number,
    gender:String,
    isAdmin:{
        type:Boolean,
        default:false
    },
    cgpa:{
        type:Number,
        min:0,
        max:10
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user',userSchema);