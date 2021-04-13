const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.post("/", userController.register);
router.post("/login", userController.login);
router.put("/:id", userController.updateUser);
router.get("/:id", userController.getUserById);
router.get("/", userController.getUserAll);
router.delete("/:id", userController.deleteUser);

module.exports = router;
