require("dotenv").config();

const express = require("express");
const cors = require("cors");
require("./config/db");

const authRoutes = require("./routes/authRoutes");
const kuesionerRoutes = require("./routes/kuesionerRoutes");
const labRoutes = require("./routes/labRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/kuesioner", kuesionerRoutes);
app.use("/api/lab", labRoutes);

app.use("/uploads", express.static("uploads"));


app.use("/", (req, res) => {
    res.send("Backend gue");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});