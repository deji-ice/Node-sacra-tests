import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/:id", (req, res) => {
  res.status(200).send("holla");
});

router.post("/create", async (req, res) => {
  try {
    const { username } = req.body;
    // get the username from the request body

    const existingUser = await User.findOne({ username }); // check if the user already exists
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }
    const user = new User(req.body); // create a new user based on the request body
    await user.save(); // save the user
    res.status(201).json("User created successfully");
  } catch (error) {
    res.status(400).json({ message: error.message }); // send the error message
  }
});

export default router;
