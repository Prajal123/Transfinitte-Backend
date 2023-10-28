require("dotenv").config({ path: ".env" });

const Nexmo = require('nexmo');

// Nexmo API Key and API Secret
const apiKey = '01e34a4e';
const apiSecret = 'o81FGBz5ImMfv4pb';

// Create a Nexmo client
const nexmo = new Nexmo({ apiKey, apiSecret });

// Array of phone numbers to send messages to
const phoneNumbers = [
  '+1234567890',
  '+9876543210',
  // Add more phone numbers here
];

// Message to send
const message = 'This is your bulk alert message from Nexmo!';

// Function to send messages to multiple numbers
function sendBulkMessages() {
    phoneNumbers.forEach((to) => {
      nexmo.message.sendSms(
        'YOUR_VIRTUAL_NUMBER', // Use your Nexmo virtual number
        to,
        message,
        (err, responseData) => {
          if (err) {
            console.error(`Error sending message to ${to}: ${err}`);
          } else {
            console.log(`Message sent to ${to}: ${responseData.messages[0]['message-id']}`);
          }
        }
      );
    });
  }

module.exports = { sendBulkMessages };