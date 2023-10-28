const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
   mobileNumber:{
    type:String,
    required:'true'
   },
   latitude:{
    type:String,
    required:true
   },
   longitude:{
    type:String,
    required:true
   }
});

module.exports=mongoose.model("User",userSchema);