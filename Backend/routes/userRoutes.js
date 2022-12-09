const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

//New routes
router.get("/api/userlist/:handle", userController.api_userlist);
router.post("/api/add", userController.api_add);
router.delete("/api/delete/:_id", userController.api_delete);

module.exports = router;
