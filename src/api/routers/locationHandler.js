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

    const alldata = await Users.find();
    res.status(200).json(alldata);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


locationRouter.get("/detectCollision", async (req, res) => {
  try {
  
    const alldata = await Users.find();
    var len=alldata.length;
    const earthRadius = 6371;

    var yellow=[],red=[],orange=[];
    console.log(alldata);
    for(pos1=0;pos1<len;pos1++){
       for(pos2=pos1+1;pos2<len;pos2++){
        // console.log(alldata[pos1].latitude);
        const lat1Rad = (parseFloat(alldata[pos1].latitude) * Math.PI) / 180;
        const lon1Rad = (parseFloat(alldata[pos1].longitude) * Math.PI) / 180;
        const lat2Rad = (parseFloat(alldata[pos2].latitude)* Math.PI) / 180;
        const lon2Rad = (parseFloat(alldata[pos2].longitude)* Math.PI) / 180;
    
        // Differences between the latitudes and longitudes
        const latDiff = Math.abs(lat2Rad - lat1Rad);
        const lonDiff = Math.abs(lon2Rad - lon1Rad);
    
        // Haversine formula
        const a = Math.sin(latDiff / 2) * 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) * 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        // Calculate the distance
        const distance = earthRadius * c; // Distance in kilometers
        // console.log(pos1,pos2,distance);
        if(distance<=1){
          red.push({pos1MN:alldata[pos1].mobileNumber,pos2MN:alldata[pos2].mobileNumber});
        }else if(distance<=5){
           orange.push({pos1MN:alldata[pos1].mobileNumber,pos2MN:alldata[pos2].mobileNumber});
        }else if(distance<=10){
          yellow.push({pos1MN:alldata[pos1].mobileNumber,pos2MN:alldata[pos2].mobileNumber});
        }
       }
    }
    console.log(yellow,red,orange);
    res.status(200).json(alldata);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = locationRouter;
