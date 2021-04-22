const express = require("express");
const router = express.Router();
const authChecker = require("../middleware/auth.middlleware");
const postController = require("../controllers/post.controllers");

router.post("", authChecker, postController.createPost);

router.post("/mail", authChecker, postController.sendMail);

router.put("/:id", authChecker, postController.updatePost);

router.get("", authChecker, postController.getPost);

router.get("/single", authChecker, postController.getSingle);

router.get("/singlepost/:id",postController.singlePost);

router.delete("/:id", authChecker, postController.deletePost);

router.get("/uniquemail",authChecker,postController.uniqueEmail)

module.exports = router;
