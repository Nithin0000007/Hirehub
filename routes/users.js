const express = require('express');
const router = express.Router();
const User = require('../models/user');

// ! middlewares
const { checkLoggedIn, verified } = require('../middlewares/index');

// CRUD -> show , edit , update

router.get('/user/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);
        res.render('users/show', { foundUser });
    } catch (error) {
        res.send(error);
    }
})

router.get('/user/:id/edit', checkLoggedIn, verified, async (req, res) => {
    try {
        const  foundUser  = await User.findById(req.params.id);
        
        res.render('users/edit', { foundUser ,id : req.params.id});
    } catch (error) {
        res.send(error);
    }
})

router.patch('/user/:id', checkLoggedIn, verified, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = {
            username: req.body.username,
            phoneNo: req.body.phoneNo,
            gender: req.body.gender,
            cgpa: req.body.cgpa
        }
        await User.findByIdAndUpdate(id, updatedUser);
        res.redirect(`/user/${id}`);
    } catch (error) {
        res.send(error);
    }
})



module.exports = router;