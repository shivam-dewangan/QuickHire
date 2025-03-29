const mongoose = require("mongoose");

const labourSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  fatherHusbandName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  aadhaar: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  email: { type: String },
  permanentAddress: { type: String, required: true },
  currentAddress: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  labourType: { type: [String], required: true }, // Array of strings
  experience: { type: Number, required: true },
  dailyWage: { type: Number, required: true },
  preferredLocation: { type: String, required: true },
  skills: { type: String },
  healthCondition: { type: String },
  bankDetails: { type: String },
  emergencyContact: { type: String, required: true },
  photo: { type: String }, // Store file paths
  idProof: { type: String },
  experienceCertificate: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Labour", labourSchema);
