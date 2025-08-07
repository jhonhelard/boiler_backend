// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const { authenticate } = require("../middleware/auth");

// Define routes

router.post("/register", authController.ownerRegister);
router.post("/login", authController.ownerLogin);
router.post("/logout", authController.logout);
router.get("/getallusers", authController.getallusers);
router.patch("/toggle-permission/:id", authController.toggleUserPermission);
router.patch("/update-user-regions/:id", authController.updateUserRegions);
router.delete("/delete-user/:id", authController.deleteUser);
router.get("/user/:userId", authController.getCurrentUser);


module.exports = router;
