const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/test", (req, res) => {
  const tmp = [
    { name: "mario", age: 17 },
    { name: "luigi", age: 18 },
  ];
  res.send(JSON.stringify(tmp));
});
router.get("/", (req, res) => res.redirect("/home/0"));
router.get("/home/:id", userController.home);
router.get("/users/:handle/:invalidUrl", userController.userList);
router.post("/users/:handle", userController.userList_add);
router.post("/delete", userController.userList_delete);
router.post("/login", userController.login);
module.exports = router;
