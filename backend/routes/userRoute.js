const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, getUser, getLoginStatus, updateUser, updatePhoto } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// POST (ĐẨY LÊN)
router.post("/register", registerUser);
router.post("/login", loginUser);

//GET (LẤY RA)
router.get("/logout", logout);
router.get("/getUser",protect, getUser);
router.get("/getLoginStatus", getLoginStatus);

// PATCH
router.patch("/updateUser", protect, updateUser);
router.patch("/updatePhoto",protect, updatePhoto);

module.exports = router;