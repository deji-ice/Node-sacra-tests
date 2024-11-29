import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";
const userRoute = express.Router();

//get request to get all users
userRoute.get("/", async (req, res) => {
  const collection = db.collection("users");
  const result = await collection.find({}).limit(10).toArray();
  res.status(200).json(result);
});

//post request to create a new user
userRoute.post("/create", async (req, res) => {
  try {
    const user = req.body;
    const collection = db.collection("users");

    const result = await collection.insertOne(user); // insert the user object

    res.status(201).json(result); // return the result
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

userRoute.get("/:id", async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const collection = db.collection("users");
    const result = await collection.findOne({ _id: userId }); // find the user by id
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//put request to update a user

userRoute.patch("/update/:id", async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const collection = db.collection("users");
    const userData = req.body;

    const result = await collection.updateOne(
      { _id: userId },
      { $set: userData }
    ); // update the user object

    if (result.modifiedCount === 0) {
      // check if the user was updated
      res.status(404).json({ message: "No user found to update" });
    }

    res.status(201).json(result); // return the result
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRoute.delete("/delete/:id", async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const collection = db.collection("users");
    const result = await collection.deleteOne({ _id: userId }); // delete the user object
    if (result.deletedCount === 0) {
      // check if the user was deleted
      res.status(404).json({ message: "No user found to delete" });
    }
    res.status(200).json(result); // return the result
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default userRoute;
