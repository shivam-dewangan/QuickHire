const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const labourRoutes = require("./routes/labourRoutes"); // Added labour routes
const path = require("path");

dotenv.config();
const app = express();

// ✅ CORS Middleware (Allow Frontend Access)

app.use(cors({
    origin: ["http://localhost:5173", "https://quickhire-1-77q3.onrender.com"], // Allow frontend access
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));


// ✅ Middleware
app.use(express.json());

// ✅ Static folder for file uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/labour", labourRoutes); // Labour routes added

app.get("/", (req, res) => {
    res.send("🚀 Smart Labor Connect API Running...");
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
