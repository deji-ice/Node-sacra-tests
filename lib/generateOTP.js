import * as OTPAuth from "otpauth";

export const generateOTP = async (userId) => {
  try {
    // Create a new TOTP object.
    let totp = new OTPAuth.TOTP({
      // Provider or service the account is associated with.
      issuer: "ACME",
      // Account identifier.
      label: "Alice",
      algorithm: "SHA1",
      // Length of the generated tokens.
      digits: 6,
      // Interval of time for which a token is valid, in seconds.
      period: 30,
      // Arbitrary key encoded in base32 or `OTPAuth.Secret` instance
      // (if omitted, a cryptographically secure random secret is generated).
      secret: OTPAuth.Secret.fromHex(userId),
      //   or: `OTPAuth.Secret.fromBase32("US3WHSG7X5KAPV27VANWKQHF3SH3HULL")`
      //   or: `new OTPAuth.Secret()`
    });

    // Generate a token (returns the current token as a string).
    let token = totp.generate();

    return token;
  } catch (error) {
    console.log(error.message);
  }
};
