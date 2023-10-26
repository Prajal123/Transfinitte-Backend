const express=require('express');
const app=express();
const dotenv=require('dotenv');
const connectToDB = require('./config/db');
dotenv.config('./.env');

connectToDB();
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
})