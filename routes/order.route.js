const express = require("express")
const {OrderModel} = require("../models/order.model")
const { UserModel } = require("../models/user.model")
const { RestaurantModel } = require("../models/restaurant.model")

const orderRouter = express.Router()

orderRouter.post("/orders", async(req,res)=>{
    try{
        const { items, totalPrice, deliveryAddress} = req.body
        // const user = await UserModel.findById(user._id)
        // const restaurant = await RestaurantModel(restaurant._id)
        // if(!user || !restaurant){
        //     return res.json(404).json({message:"Data not found"})
        // }
        const order = new OrderModel({
            items,
            totalPrice,
            deliveryAddress,
            status:"placed"
        })
        await order.save()
        res.status(201).json({message:"Order created successfully"})
    }
    catch(err){
        res.status(500).json({message:"Something went wrong", error: err.message})
    }
})

orderRouter.get("/orders/:id", async(req,res)=>{
    try{
        const {id} = req.params
        const order = await OrderModel.findById(id)
        if(!order){
            return res.status(404).json({message:"Order not found"})
        }
        res.json(order)
    }
    catch(err){
        res.status(500).json({message:"Something went wrong", error:err.message})
    }
})

orderRouter.patch("/orders/:id", async(req,res)=>{
    try{
        const {id} = req.params
        const {status} = req.body
        const order = await OrderModel.findByIdAndUpdate(id, {status}, {new:true})
        if(!order){
            return res.status(404).json({message:"order not found"})
        }
        res.json({message:"Order status updated successfully"})
    }
    catch(err){
        res.status(500).json({message:"Something went wrong", error:err.message})
    }
})

module.exports = {orderRouter}