const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/login', (req, res) => { });

router.post('/login', (req, res) => { });

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/signup', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        cgpa: req.body.cgpa,
        gender: req.body.gender,
        phone: req.body.phone,
    });
    let registeredUser = await User.register(newUser, req.body.password);
        res.send('ok');
});

router.get('/logout', (req, res) => { });

module.exports = router;
