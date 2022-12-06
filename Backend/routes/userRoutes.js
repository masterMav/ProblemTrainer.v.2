const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/", (req, res) => res.redirect("/home/0"));
router.get("/home/:id", userController.home);
router.get("/users/:handle/:invalidUrl", userController.userList);
router.post("/users/:handle", userController.userList_add);
router.post("/delete", userController.userList_delete);
router.post("/login", userController.login);

//New routes
router.get("/api/userlist/:handle", userController.api_userlist);
router.post("/api/add", userController.api_add);

module.exports = router;
