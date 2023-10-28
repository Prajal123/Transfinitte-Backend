const locationRouter = require("express").Router();
require("dotenv").config({ path: ".env" });

const Users = require("../../database/models/Users");

const { authJWT } = require("../../middlewares/jwt");

locationRouter.post("/post", async (req, res) => {
  try {
    const { mobileNumber, latitude, longitude } = req.body;

    // Creating a new dataset
    const newUser = new Users();
    newUser.mobileNumber = mobileNumber;
    newUser.latitude = latitude;
    newUser.longitude = longitude;
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

locationRouter.post("/update", async (req, res) => {
  try {
    const { mobileNumber, latitude, longitude } = req.body;
    const existingUser = await Users.findOne({ mobileNumber });

    if (existingUser) {
      existingUser.latitude = latitude;
      existingUser.longitude = longitude;
      await existingUser.save();
      res.status(200).json(existingUser);
    } else {
      const newUser = new Users({ mobileNumber, latitude, longitude });
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

locationRouter.get("/getdetails", authJWT, async (req, res) => {
  try {
    const userId = req.jwt_payload.id;

    console.log(userId);

    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = locationRouter;
