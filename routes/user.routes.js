const express = require("express");
const router = express.Router();
const userController =require('../controllers/user.controller');
router.post("/register",userController.createUser);
router.post("/login", userController.loginUser);
router.post('/sendmail',userController.resetLink);
router.post('/reset/:id',userController.resetPassword)
router.get("/user",userController.getUser);
module.exports = router;
