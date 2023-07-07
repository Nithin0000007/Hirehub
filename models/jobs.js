const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const jobSchema = new mongoose.Schema({
    postName : {
        type:String,
        required:true,
        default:"SDE"
    },
    companyName : {
        type:String,
        required:true,
        default:"Not given"
    },
    ctc : {
        type:Number,
        required:true,
    },
    location: String,
    cgpa:Number,
    description:String,
    noOfOpenings:Number
});

jobSchema.plugin(mongoosePaginate);

const jobModel = mongoose.model('job',jobSchema);

module.exports = jobModel;