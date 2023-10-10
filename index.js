// how to start mongodb server $ mongod --dbpath ./fullstack\ database/
// how to start node server nodemon index.js
const express = require("express");
// By default CORS are blocked so we use a Middleware to unblock CORS
const cors = require("cors");
// By default EXPRESS dont have something to parse Body of a request So we use a MiddleWare
// Body Parser
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// importing the Model from the models folder
const User = require("./models/Users");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/demo");
  console.log("db Connected");
}

const server = express();
// We use middleware Like this
server.use(cors());
server.use(bodyParser.json());
main().catch((err) => console.log(err));

server.post("/demo", async (req, res) => {
  //  Creating a new user, so all the manupulations can be performed on this object and we dont need
  // to dive into the database to make changes.
  const user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  const doc = await user.save();

  console.log(doc);
  res.json(doc);
});

server.get("/demo", async (req, res) => {
  const docs = await User.find({});
  res.json(docs);
});
server.get("/demo/getUser/:id", async (req, res) => {
  const idToUpdate = req.params.id;
  const docs = await User.findById({ _id: idToUpdate });
  res.json(docs);
});

server.put("/demo/updateUser/:id", async (req, res) => {
  const idToUpdate = req.params.id;
  const docs = await User.findByIdAndUpdate(
    { _id: idToUpdate },
    {
      username: req.body.username,
      password: req.body.password,
    }
  ); 
  res.json(docs);
});

server.delete("/demo/:id", async (req, res) => {
  try {
    const idToDelete = req.params.id;

    // Use User.deleteOne() to delete a user by username
    const result = await User.deleteOne({ _id: idToDelete });

    if (result.deletedCount === 1) {
      // The user was deleted successfully
      res.status(200).json({ message: "User deleted successfully." });
    } else {
      // User not found
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

server.listen(8080, () => {
  console.log("server started at 8080");
});
