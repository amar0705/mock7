const mongoose = require("mongoose")

const restaurantSchema = mongoose.Schema({
        name: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        },
        menu: [{
          name: String,
          description: String,
          price: Number,
          image: String
        }] 
})

const RestaurantModel = mongoose.model("restaurant", restaurantSchema)

module.exports = {RestaurantModel}


// {
//     "name":"Restaurant 1",
//     "address":{
//       "street":"123",
//       "city":"city 1",
//       "state":"Cal",
//       "country":"US",
//       "zip":"001"
//     },
//     "menu":[
//       {
//       "name":"dish 1",
//       "description":"description 1",
//       "price":1000,
//       "image":"image 1"
//       }
//       ]
//   }
  