const express = require('express');
const router = express.Router();

const notifications = require('../models/notification');
const jobModel = require('../models/jobs');

// ! middlewares
const {checkAdmin,checkLoggedIn} = require('../middlewares/index');

router.get('/notifications',async (req,res)=>{
try {
    const allNoti = await notifications.find();
    res.render('notification/index',{allNoti});
} catch (error) {
    res.send(error);
}
})

router.get('/notifications/new', checkLoggedIn,checkAdmin,(req,res)=>{
    res.render('notification/new');
})

router.post('/notifications',checkLoggedIn,checkAdmin,async (req,res)=>{
    try {
        const newNoti = new notifications({
            title:req.body.title,
            body:req.body.body,
            author:req.body.author
        })
        await newNoti.save();
        res.redirect('/notifications');
    } catch (error) {
        res.send(error);
    }
})

router.get('/notifications/:id/edit',checkLoggedIn,checkAdmin,async (req,res)=>{
    try {
        const noti = await notifications.findById(req.params.id);
        res.render('notification/edit',{noti});
    } catch (error) {
        res.send(error);
    }
})

router.patch('/notifications/:id',checkLoggedIn,checkAdmin,async (req,res)=>{
    try {
        const Noti = {
            title:req.body.title,
            body:req.body.body,
            author:req.body.author
        }
        await notifications.findByIdAndUpdate(req.params.id,Noti);
        res.redirect('/notifications');
    } catch (error) {
        res.send(error);
    }
})

router.delete('/notifications/:id',checkLoggedIn,checkAdmin,async (req,res)=>{
    try {
        await notifications.findByIdAndDelete(req.params.id);
        res.redirect('/notifications');
    } catch (error) {
        res.send(error);
    }
})



module.exports = router;