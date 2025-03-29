const express = require("express");
const multer = require("multer");
const Labour = require("../models/labourModel");

const router = express.Router();

// Multer Storage for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 📌 Labour Registration Route
router.post(
  "/register",
  upload.fields([
    { name: "photo" },
    { name: "idProof" },
    { name: "experienceCertificate" },
  ]),
  async (req, res) => {
    try {
      console.log("➡️ Incoming Data:", req.body);
      console.log("➡️ Uploaded Files:", req.files);

      const { body, files } = req;

      const newLabour = new Labour({
        fullName: body.fullName,
        fatherHusbandName: body.fatherHusbandName,
        gender: body.gender,
        dob: body.dob,
        aadhaar: body.aadhaar,
        mobile: body.mobile,
        email: body.email,
        permanentAddress: body.permanentAddress,
        currentAddress: body.currentAddress,
        pincode: body.pincode,
        state: body.state,
        district: body.district,
        labourType: JSON.parse(body.labourType), // Convert JSON string to Array
        experience: Number(body.experience), // Convert to Number
        dailyWage: Number(body.dailyWage), // Convert to Number
        preferredLocation: body.preferredLocation,
        skills: body.skills,
        healthCondition: body.healthCondition,
        bankDetails: body.bankDetails,
        emergencyContact: body.emergencyContact,
        photo: files.photo ? files.photo[0].path : null,
        idProof: files.idProof ? files.idProof[0].path : null,
        experienceCertificate: files.experienceCertificate ? files.experienceCertificate[0].path : null,
      });

      await newLabour.save();
      res.status(201).json({ message: "Labour registered successfully", data: newLabour });
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({ message: "Error registering labour", error: error.message });
    }
  }
);

// 📌 Get All Labour Records
router.get("/all", async (req, res) => {
  try {
    const labourers = await Labour.find();
    res.json(labourers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching labour data", error });
  }
});

module.exports = router;
