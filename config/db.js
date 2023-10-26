const mongoose=require('mongoose');

const connectToDB=async()=>{
    try{
    await mongoose.connect('mongodb+srv://Prajal123:Prajal123@cluster0.iuei5.mongodb.net/?retryWrites=true&w=majority',{useUnifiedTopology:true,useNewUrlParser:true})
    console.log("connected to database");
    }catch(err){
        console.log(err);
    }
}

module.exports=connectToDB;
