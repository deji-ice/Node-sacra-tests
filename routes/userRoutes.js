import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/create", createUser); // create a new user
router.post("/login", loginUser); // login a user

router.get("/", getAllUsers); // get all users

router.get("/:id", getSingleUser); // get a single user

router.patch("/update/:id", updateUser); // update a user
router.delete("/delete/:id", deleteUser); // delete a user
export default router;
