const express = require("express")
const {RestaurantModel} = require("../models/restaurant.model")

const restaurantRouter = express.Router()

restaurantRouter.get("/restaurants", async(req,res)=>{
    try{
        const restaurants = await RestaurantModel.find()
        res.json(restaurants)
    }
    catch(err){
        res.status(500).json({message:"Some error occured"})
    }
})

restaurantRouter.get("/restaurants/:id", async(req,res)=>{
    try{
        const {id} = req.params
        const restaurant = await RestaurantModel.findById(id)
        if(!restaurant){
            return res.status(404).json({message:"No Restaurants Found"})
        }
        res.json(restaurant)
    }
    catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
})

restaurantRouter.get("/restaurants/:id/menu", async(req,res)=>{
    try{
        const {id} = req.params
        const restaurant = await RestaurantModel.findById(id)
        if(!restaurant){
            return res.status(404).json({message:"No data Found"})
        }
        const menu = restaurant.menu
        res.json(menu)
    }
    catch(err){
        res.status(500).json({message:"Something went wrong", error:err.message})
    }
})

restaurantRouter.post("/restaurants", async(req,res)=>{
    try{
        const {name, address, menu} = req.body
        const restaurant = new RestaurantModel({name, address,  menu})
        await restaurant.save()
        res.status(201).json({message:"Restaurant added successfully"})
    }
    catch(err){
        res.json(500).json({message:"Something went wrong", error: err.message})
    }
})

restaurantRouter.put("/restaurants/:id/menu", async(req,res)=>{
    try{
        const {id} = req.params
        const {name, description, price, image} = req.body
        const restaurant = await RestaurantModel.findById(id)
        if(!restaurant){
            return res.status(404).json({message:"Restaurant not found"})
        }
        const menuItem = {name, description, price, image}
        restaurant.menu.push(menuItem)
        await restaurant.save()
        res.status(201).json({message:"Menu Item added successfully"})
    }
    catch(err){
        res.status(500).json({message:"Something went wrong", error:err.message})
    }
})

restaurantRouter.delete("restaurants/:id/menu/:menuid", async(req,res)=>{
    try{
        const {id, menuid} = req.params
        const restaurant = await RestaurantModel.findById(id)
        if(!restaurant){
            return res.status(404).json({message:"Restaurant not found"})
        }
        const menuIndex = restaurant.menu.findIndex(item=> item._id.toString() === menuid)
        if(menuIndex === -1){
            return res.json(404).json({message:"Menu item not found"})
        }
        restaurant.menu.splice(menuIndex,1)
        await restaurant.save()
        res.json({message:"Menu Item deleted successfully"})
    }
    catch(err){
        res.status(500).json({message:"Something went wrong", error:err.message})
    }
})

module.exports = {restaurantRouter}