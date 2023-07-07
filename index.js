const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// Connecting Mongoose
mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log('Database connected!');
})
.catch((error)=>{
    console.log(error);
})

// session setup

app.use(session({
    secret:''
}));



//  server setup-----

// serving static files
app.use(express.static(path.join(__dirname,'public')));

// form data parsing 
app.use(express.urlencoded({extended:true}));

// remove ejs extension
app.set('view engine','ejs');

app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.send("working");
})

const jobRouter = require('./routes/jobs');
const notiRouter = require('./routes/notifications');



app.use(notiRouter);
app.use(jobRouter);


app.listen(3000,()=>{
    console.log("Server is running ...");
})

