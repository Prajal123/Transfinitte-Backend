require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error.message, "Error with db Conn"));
db.once("open", () => console.log("Connected to database"));
