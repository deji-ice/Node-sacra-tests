import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUser } from "../middlewares/validateUser.js";
import { loginLimiter } from "../middlewares/loginLimiter.js";
import { validateJWT } from "../middlewares/validateJWT.js";

const router = express.Router();

router.post("/create", createUser); // create a new user

// loginLimit is a middleware that limits the number of requests to the login route
router.post("/login", loginLimiter, loginUser); // login a user

// validateUser is a middleware that checks if the user is authorized to access the route
// router.get("/", validateUser, getAllUsers); // get all users

// validateJWT is a middleware that checks if the user has a valid JWT token
router.get("/", validateJWT, getAllUsers); // get all users

router.get("/:id", getSingleUser); // get a single user

router.patch("/update/:id", validateJWT, updateUser); // update a user
router.delete("/delete/:id", deleteUser); // delete a user
export default router;
