// Desc: Middleware to validate JWT token
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();


export const validateJWT = (req, res, next) => {
  try {
    // Get the token from the headers and split it to get the token value
    const token = req.headers.authorization.split(" ")[1];

    // Check if the token is valid
    if (!token) return res.status(401).json("Access denied, token missing");

    // Verify the token
    const verified = jwt.verify(token, process.env.SECRET_KEY);

    // Check if the token is verified
    if (!verified) return res.status(401).json("Invalid token, authorization denied 🙁");

    // If the token is verified, move to the next middleware
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
