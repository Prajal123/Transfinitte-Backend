const locationRouter = require("express").Router();
const nodemailer = require('nodemailer');

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

    const alldata = await Users.find();
    res.status(200).json(alldata);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


locationRouter.get("/detectCollision", authJWT,async (req, res) => {
  try {

    const userId = req.jwt_payload.id;
    
    const user = await Users.findById(userId);
   console.log(user);
  
    const alldata = await Users.find();
    var len=alldata.length;
    const earthRadius = 6371;
    
    const lat1Rad=(user.latitude*Math.PI)/180;
    const lon1Rad=(user.longitude*Math.PI)/180;

    var red=0,orange=0,yellow=0;

    for(pos1=0;pos1<len;pos1++){
      if(user.latitude==alldata[pos1].latitude && user.longitude ==alldata[pos1].longitude)continue;

        const lat2Rad = (alldata[pos1].latitude* Math.PI) / 180;
        const lon2Rad = (alldata[pos1].longitude* Math.PI) / 180;
    
        // Differences between the latitudes and longitudes
        const latDiff = Math.abs(lat2Rad - lat1Rad);
        const lonDiff = Math.abs(lon2Rad - lon1Rad);
    
        // Haversine formula
        const a = Math.sin(latDiff / 2) * 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) * 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        // Calculate the distance
        const distance = earthRadius * c; // Distance in kilometers
         
        if(distance<=1)red++;
        else if(distance<=5)orange++;
        else if(distance<=10)yellow++;
       
    }
    var text="";

    if(red){
      text="You are in red zone, please stop vehicle";
     res.send(200).json("You are in red zone, please stop vehicle");
    }else if(orange){
      text="You are in orange zone, please go slow";
      res.send(200).json("You are in orange zone, please go slow");
    }else if(yellow){
      text="You are in yellow zone, move carefully";
      res.send(200).json("You are in yellow zone, move carefully");
    }else{
      text="You are fine";
      res.send(200).json("You are fine");
    }

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'singhalprajal@gmail.com',
        pass: 'Prajal@123'
      }
    });
    
    var mailOptions = {
      from: 'singhalprajal@gmail.com',
      to: 'singhalprajalkumar@gmail.com',
      subject: 'Collision Detection Alert',
      text: text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = locationRouter;
