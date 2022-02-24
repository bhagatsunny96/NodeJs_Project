//Creating Rest APIs for CRUD operation in the database

const { Router } = require('express');
const express = require('express');
const path = require("path");
const router = express.Router();
const User = require('../models/employee');

//Get request : get all users
router.get("/",async(req,res)=>{
    try{
        let users = await User.find();
        res.status(200).json(users); 
    }catch(err){
        res.send("Oops!! Something went wrong. Please try again after some time." + err);
    }
});

//Get request : get a single user
router.get("/:id",async(req,res)=>{
    try{
        let user = await User.findById(req.params.id);
        res.status(200).json(user); 
    }catch(err){
        res.send("Oops!! Something went wrong. Please try again after some time." + err);
    }
});


//Post Request
router.post("/",async(req,res)=>{
    let user = new User({
        email : req.body.email,
        password : req.body.password,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
    });
    try{
        let newUser = await user.save();
        res.status(200).json(newUser); 
    }catch(err){
        res.status(400).send("Oops!! Something went wrong. Please try again after some time." + err);
    }
});


//Update request : Put request 
router.put("/:id",async(req,res)=>{
    try {
        let user= await User.findById(req.params.id);
        user.email = req.body.email;
        user.password = req.body.password;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        let newUser=await user.save();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).send("Oops!! Something went wrong. Please try again after some time." + err);
    }
});

//Delete request
router.delete("/:id",async(req,res)=>{
    try {
        let user = await User.findById(req.params.id);
        let newUser = await user.delete();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).send("Oops!! Something went wrong. Please try again after some time." + err);
    }
})

module.exports = router;