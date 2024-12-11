import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  loginWithOTP,
  sendOTP,
  updateUser,
} from "../controllers/userController.js";
import { loginLimiter } from "../middlewares/loginLimiter.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import validateOTP from "../middlewares/validateOTP.js";

const router = express.Router();

router.post("/create", createUser); // create a new user

// loginLimit is a middleware that limits the number of requests to the login route
router.post("/login", loginLimiter, loginUser); // login a user

// validateJWT is a middleware that checks if the user has a valid JWT token

router.get("/", validateJWT, getAllUsers); // get all users

router.get("/:id", validateJWT, getSingleUser); // get a single user by id

router.patch("/update/:id", validateJWT, updateUser); // update a user by id
router.delete("/delete/:id", validateJWT, deleteUser); // delete a user by id
router.post("/send-otp", sendOTP); // send OTP to a user email

router.post("/login-otp",validateOTP, loginWithOTP); // login a user with OTP
export default router;
