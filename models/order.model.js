const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
      items: [{
        name: String,
        price: Number,
        quantity: Number
      }],
      totalPrice: Number,
      deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
      },
      status: String // e.g, "placed", "preparing", "on the way", "delivered"
})

const OrderModel = mongoose.model("order", orderSchema)

module.exports = {OrderModel}



// {
//     "items": [{
//        "name": "item 1",
//        "price": 500,
//        "quantity": 1
//      }],
//      "totalPrice": 500,
//      "deliveryAddress": {
//        "street": "123",
//        "city": "cal",
//        "state": "kal",
//        "country": "US",
//        "zip": "001"
//      },
//      "status": "placed"
//   }
  