const express = require("express")
const {UserModel} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const userRouter = express.Router()

userRouter.post("/register", async(req,res)=>{
    try{
        const {name, email, password, address} = req.body
        const hashed_password = await bcrypt.hash(password, 10)
        const user = new UserModel({name, email, password: hashed_password, address})
        await user.save()
        res.status(201).json({message:"User registered successfully"})
    }
    catch(err){
        res.status(500).json({message:"Something went wrong", error: err.message})
    }
})

userRouter.post("/login", async(req,res)=>{
    try{
        const {email, password} = req.body
        const user = await UserModel.findOne({email})
        if(!user){
            return res.json(401).json({message:"Wrong Credentials"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({message:"Wrong Credentials"})
        }
        const token = jwt.sign({userID: user._id}, process.env.key)
        res.json({message:"Login Successful", token: token})
    }
    catch(err){
        res.status(500).json({message:"Something went wrong", error:err.message})
    }
})

userRouter.patch("/user/:id/reset", async(req,res)=>{
    try{
        const {id} = req.params
        const {password} = req.body
        const hashed_password = await bcrypt.hash(password,10)
        await UserModel.findByIdAndUpdate(id, {password: hashed_password})
        res.json({message:"Password reset Successfully"})
    }
    catch(err){
        res.status(500).json({message:"Something went wrong", error: err.message})
    }
})

module.exports  ={userRouter}