const UserRouter = require("express").Router();
require("dotenv").config({ path: ".env" });

const Users = require("../../database/models/Users");

const { createJWTtoken } = require("../../middlewares/jwt");
const { sendOTPVerification } = require("../controllers/otpservice");

//Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = require("twilio")(accountSid, authToken);

//OTP LOGIN METHOD BEGINS
UserRouter.get("/login", async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({ message: "Fill all the fields" });
    }

    // Find the user by mobileNumber
    // const user = await Users.findOne({ mobileNumber });
    const user = true;
    if (user) {
      //Sending the OTP to the mobile number
      sendOTPVerification(mobileNumber);

      return res.status(200).json({
        message: "OTP sent to the User!",
      });
    } else {
      // Handle other cases (if needed)
      return res.status(200).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error, Try again later.",
    });
  }
});

UserRouter.get("/verifyPhOTP", async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;
    console.log(req.body);

    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({
        to: `+91${mobileNumber}`,
        code: otp,
      });

    if (verificationCheck.status === "approved") {
      // const user = await Users.findOne({ mobileNumber });
      const user = true;

      if (user) {
        const token = await createJWTtoken(user);

        return res.status(200).json({
          message: "Logged in Successfully!",
          userExists: true,
          token,
        });
      }
    } else {
      res.status(400).send({ error: "Invalid OTP. Please try again." });
    }
  } catch (error) {
    //console.error("Twilio API Error:", error);
    res.status(500).send({ error: "Failed to verify OTP." });
  }
});

module.exports = UserRouter;