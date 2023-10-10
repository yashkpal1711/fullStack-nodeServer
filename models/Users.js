const mongoose = require("mongoose");

// Creating a Schema- which filter and validates the incoming data
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

//  Creating a Model, which can be considered as a Class and we can make objects of it
//  it'll be helpful bcoz our data will be stored as a JSON
const User = mongoose.model("User", userSchema);
module.exports = User;
