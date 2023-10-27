require("dotenv").config({ path: ".env" });

//Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = require("twilio")(accountSid, authToken);

async function sendOTPVerification(mobileNumber) {
  try {
    const verification = await client.verify.v2.services(verifySid).verifications.create({
      to: `+91${mobileNumber}`,
      channel: "sms",
    });
    
    return verification;
  } catch (error) {
    throw error;
  }
}

module.exports = { sendOTPVerification };
