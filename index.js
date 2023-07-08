const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');
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

const User = require('./models/user');

// session setup

app.use(
    session({
    secret:'R6aX[LvwMP48?Q+r3J#T',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        //secure : true
        maxAge: 1000 * 60 * 60 * 24 * 2
    }
}));



// passport setup

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
const authRouter = require('./routes/auth');



app.use(notiRouter);
app.use(jobRouter);
app.use(authRouter);

app.listen(3000,()=>{
    console.log("Server is running ...");
})

