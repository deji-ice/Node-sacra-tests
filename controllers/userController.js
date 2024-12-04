import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // get the username and password from the request body

    const existingUser = await User.findOne({ username }); // check if the user already exists
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    const user = new User(req.body); // create a new user based on the request body

    const saltRounds = 10; // set the salt rounds

    const hashedPassword = await bcrypt.hash(password, saltRounds); // hash the password

    user.password = hashedPassword; // set the hashed password to the user
    await user.save(); // save the user
    res.status(201).json("User created successfully");
  } catch (error) {
    res.status(400).json({ message: error.message }); // send the error message
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }); // find the user based on the username

    if (!user) return res.status(404).json("User not found");

    const validPassword = await bcrypt.compare(password, user.password); // compare the password with the hashed password

    if (!validPassword) return res.status(400).json("Invalid password"); // send an error message if the password is invalid

    res.status(200).json("Login successful"); // send a success message
  } catch (error) {
    res.status(500).json({ message: error.message }); // send the error message
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: false }); // get all users from the database based on the User model

    if (!users) return res.status(404).json("No users found");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params; // get the id from the request parameters
    const user = await User.findById(id, { password: false }); // find a user based on the id
    if (!user) return res.status(404).json("User not found");
    res.status(200).json(user); // send the user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // get the id from the request parameters
    if (!id) return res.status(400).json("User ID is required");

    const data = req.body; // get the data from the request body
    if (!data) return res.status(400).json("request body is required");

    const user = await User.findByIdAndUpdate(id, data);
    if (!user) return res.status(404).json("User not found");

    const insertedUser = await user.save(); // save the user info into the database
    res
      .status(200)
      .json({ message: "User updated successfully", data: insertedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // get the id from the request parameters
    if (!id) return res.status(400).json("User ID is required");

    const user = await User.findByIdAndDelete(id); // find a user based on the id and delete it
    if (!user) return res.status(404).json("User not found");
    res.status(200).json({ message: "User deleted successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
