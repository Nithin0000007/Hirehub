const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/login', (req, res) => { 
    res.render('users/login');
});

router.post('/login', passport.authenticate('local',{
    failureRedirect:'/login',
}),(req, res) => {
    res.redirect('/jobs');
 });

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/signup', async (req, res) => {
    const nUser = new User({
        username: req.body.username,
        cgpa: req.body.cgpa,
        gender: req.body.gender,
        phone: req.body.phone,
    });
    let registeredUser = await User.register(nUser, req.body.password);
    req.login(registeredUser,(error)=>{
        if(error)res.send(error);
        res.redirect('/jobs');
    })
});

router.get('/logout', (req, res) => {
    req.logout((error)=>{
        if(error)res.send(error);
        res.redirect('/jobs');
    })
});

module.exports = router;
