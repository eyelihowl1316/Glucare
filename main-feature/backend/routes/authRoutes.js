const express = require("express");
const router = express.Router();
const { registerUser, loginUser, inputData, getProfile, updateProfile, uploadPhoto } = require("../controllers/authController");
const upload = require("../uploads/uploads");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/inputData", inputData);
router.get("/profile/:id", getProfile);
router.put("/upload-photo/:id", upload.single("image"), uploadPhoto);
router.put("/update-profile/:id", updateProfile);


module.exports = router;