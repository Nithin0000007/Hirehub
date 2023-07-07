const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');
const notification = require('../models/notification');

// index router
router.get('/jobs',async (req,res)=>{
    try {
        let pageNo = 1;
        if(req.query.page)pageNo = req.query.page;
        const options = {
            page:pageNo,
            limit:10
        };
        const jobs = await Job.paginate({},options);
        res.render('jobs/index',{jobs});
    } catch (error) {
        res.send(error);
    }
})

// new router
router.get('/jobs/new',(req,res)=>{
    res.render('jobs/new');
})

// create router
router.post('/jobs',async(req,res)=>{
    try {
        const newJob = new Job({
            postName : req.body.postName,
            companyName : req.body.companyName,
            ctc : req.body.ctc,
            location: req.body.location,
            cgpa:req.body.cgpa,
            description:req.body.description,
            noOfOpenings:req.body.noOfOpenings
        });
        await newJob.save();
        const Noti = new notification({
            title:`new ${newJob.postName} job openings`,
            body:`number of openings${newJob.noOfOpenings}`,
            author:`Posted by ${newJob.companyName}`
        })
        await Noti.save();
        res.redirect('/jobs');
    } catch (error) {
        res.send(error);
    }
})

//show router
router.get('/jobs/:id',async (req,res)=>{
    try {
        const foundJob = await Job.findById(req.params.id);
        res.render('jobs/show.ejs',{foundJob});
    } catch (error) {
        res.send(error);
    }
})

//edit
router.get('/jobs/:id/edit',async (req,res)=>{
    try {
        const job = await Job.findById(req.params.id);
        res.render('jobs/edit',{job});
    } catch (error) {
        res.send(error);
    }
})

//update
router.patch('/jobs/:id',async (req,res)=>{
    try {
        const jobData = {
            postName : req.body.postName,
            companyName : req.body.companyName,
            ctc : req.body.ctc,
            location: req.body.location,
            cgpa:req.body.cgpa,
            description:req.body.description,
            noOfOpenings:req.body.noOfOpenings
        }
        await Job.findByIdAndUpdate(req.params.id,jobData);
        const Noti = new notification({
            title:`${jobData.postName}has been edited`,
            body:`number of openings${jobData.noOfOpenings}`,
            author:`${jobData.companyName} has Edited their job`
        })
        await Noti.save();
        res.redirect('/jobs');
    } catch (error) {
        res.send(error);
    }
})

//delete
router.delete('/jobs/:id',async (req,res)=>{
    try {
        const jobData = await Job.findById(req.params.id);
        await Job.findByIdAndDelete(req.params.id);
        const Noti = new notification({
            title:`${jobData.postName} has been deleted`,
            author:`${jobData.companyName} has deleted the post`
        })
        await Noti.save();
        res.redirect('/jobs');
    } catch (error) {
        console.log(error);
    }
})

// router.get('/seed',async (req,res) =>{
//     try {
//         for(let i = 0; i < 200; i++)
//         {
//             const jobData = new Job({
//                 postName : "SDE",
//                 companyName : "Google",
//                 ctc : 45,
//                 location: 'bangolore',
//                 cgpa:7,
//                 description:'ndicnsmcscosncss',
//                 noOfOpenings:1
//             })
//             await jobData.save();
//         }
//         res.redirect('/jobs');
//     } catch (error) {
//         res.send(error);
//     }
// })

module.exports = router;