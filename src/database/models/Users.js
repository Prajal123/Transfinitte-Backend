const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
   mobileNumber:{
    type:String,
    required:'true'
   },
   latitude:{
    type:String
   },
   longitude:{
    type:String
   },
   velocity:{
      type:Number
   },
   email:{
      type:String,
      required:true
   }
});

module.exports=mongoose.model("User",userSchema);