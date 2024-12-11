import User from "../models/userModel.js";
import * as OTPAuth from "otpauth";

const validateOTP = async (req, res, next) => {
  try {
    const { otp, email } = req.body; // get the otp and email from the request body

    // if the email or otp is not provided, return an error message
    if (!email || !otp)
      return res.status(400).json("Email and OTP are required");

    const user = await User.findOne({ email }); // find the user based on the email
    if (!user) return res.status(404).json("User not found");

    // Remove ObjectId wrapper from user._id
    const userId = user._id
      .toString()
      .replace(/^new ObjectId\("(.+)"\)$/, "$1");

    // Create a new TOTP object.
    let totp = new OTPAuth.TOTP({
      issuer: "ACME",
      label: "Alice",
      algorithm: "SHA1",
      digits: 6,
      period: 300,
      secret: OTPAuth.Secret.fromHex(userId), // Use the user's ID as the secret, dont let them know ;)
    });

    // Verify a token.
    let isValid = totp.validate({
      token: otp,
      window: 1,
    });

    // if the OTP is invalid, return an error message 
    if (isValid === null) return res.status(400).json("Invalid OTP");

    next(); // if the OTP is valid, call the next middleware
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default validateOTP;
