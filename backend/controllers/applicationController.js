const Application = require('../models/applicationModel');
const mongoose = require('mongoose');


//get all apps
const getApplications = async(req, res)=>{
    const user_id = req.user._id;
    const apps = await Application.find({user_id}).sort({createdAt:-1});
    res.status(200).json(apps);
}

//get a single app
const getApp = async(req, res)=> {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).json({error:"application doens't exist"});
    }
    const app = await Application.findById(id);
    if(!app)
    {
        return res.status(404).json({error:"application doens't exist"})
    }
}
//get all apps with coding challenges
const getAppsWithCodingChallenges = async(req, res) =>
{
    const apps = await Application.find({status:"Coding-Challenge"});
    if(!apps){
        console.log("no apps found");
    }
}
//get all apps with interviews
const getAppsWithInterviews = async(req, res) =>
{
    const apps = await Application.find({status:"Interview"});
    if(!apps){
        console.log("no apps found");
    }
}
//get all apps with no status on application
const getAppsWithNoStatus= async(req, res) =>
{
    const apps = await Application.find({status:"No Status"});
    if(!apps){
        console.log("no apps found");
    }
}
//get all apps without Rejections
const getAppsWithNoRejections = async(req, res) =>
{
    const apps = await Application.find({status:{$ne:"Rejected"}});
    if(!apps){
        console.log("no apps found");
    }
}
//create new app
const createApplication = async(req, res) => {
    const {jobName, position, applicationLink, username, password, notes, status} = req.body
    //add app to db
    let emptyFields = [];
    if(!jobName) 
    {
        emptyFields.push('Job Name');
    }
    if(!position) 
    {
        emptyFields.push('Position');
    }
    if(!applicationLink) 
    {
        emptyFields.push('Application Link');
    }
    if(!status) 
    {
        emptyFields.push('Status');
    }
    if(emptyFields.length>0)
    { 

        return res.status(400).json({error:'Please fill in all the fields', emptyFields});
    }
    try{
        const user_id = req.user._id;
        const app = await Application.create({jobName, position, applicationLink, username, password, notes, status, user_id});
        res.status(200).json(app);
    }
    catch(error){
        res.json({error:error.message})

    }
}


//delete app
const deleteApp = async(req, res) => 
{
    const {id} = req.params; 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).json({error:"application doesn't exist"});
    }

    const app = await Application.findOneAndDelete({_id:id});
    if(!app)
    {
        return res.status(404).json({error:"application doesn't exist"})
    }
    res.status(200).json(app);
    
}


//update app
const updateApp = async(req, res) => {
    const {id} = req.params; 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).json({error:"application doens't exist"});
    }
    const app = await Application.findOneAndUpdate({_id:id}, {...req.body})
    if(!app)
    {
        return res.status(404).json({error:"application doens't exist"})
    }
    res.status(200).json(app);
}


module.exports = {
    getApplications,
    getApp,
    getAppsWithCodingChallenges,
    getAppsWithInterviews,
    getAppsWithNoStatus,
    getAppsWithNoRejections,
    createApplication, 
    deleteApp, 
    updateApp
}