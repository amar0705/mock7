const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
        name: String,
        email: String,
        password: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        }
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {UserModel}



// {
//     "name": "Amar",
//     "email": "amar@gmail.com",
//     "password": "amar",
//     "address": {
//       "street": "1",
//       "city": "Delhi",
//       "state": "Delhi",
//       "country": "India",
//       "zip": "100"
//     }
//   }