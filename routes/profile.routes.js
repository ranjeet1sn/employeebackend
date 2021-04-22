const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const authChecker = require("../middleware/auth.middlleware");

router.post("", authChecker, profileController.createProfile);

router.get("/:email", authChecker, profileController.getProfile);

router.put("/:id", authChecker, profileController.updateProfile);

module.exports = router;
