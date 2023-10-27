const mongoose = require("mongoose");

// Define the Work Schema
const workSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
});

// Define the Education Schema
const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: false,
  },
  eduInstitute: {
    type: String,
    required: false,
  },
  userDepartment: {
    type: String,
    required: false,
  },
  yearOfGrad: {
    type: Number,
    required: false,
  },
  location: {
    type: String, // Assuming Location is a string, you can adjust the type as needed
    required: false,
  },
});

// Define the User Schema
const userSchema = new mongoose.Schema({
  // Other user fields
  universityName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userDepartment: {
    type: String,
    required: true,
  },
  yearOfGrad: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
  },

  //Usecase to be decided
  section: {
    type: String,
    required: false,
  },
  isAdminVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  pictureUrl: {
    type: String,
    required: false,
  },

  //Usecase to be decided
  emplType: {
    type: String,
    required: false,
    enum: ["Full Time", "Part Time"],
  },

  //Usecase to be decided 
  industry: {
    type: String,
    required: false,
  },

  //Usecase to be decided
  rolesAndResp: {
    type: String,
    required: false,
  },
  Skills: {
    type: String,
    required: false,
  },
  workExp: {
    type: String,
    required: false,
  },
  isPhVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  summary: {
    type: String,
    required: false,
  },
  currentStatus: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },

  // Embed the array of work experiences
  work: [workSchema], // An array of work experiences

  // Embed the array of education details
  education: [educationSchema], // An array of education details
});

module.exports = mongoose.model("User", userSchema);
