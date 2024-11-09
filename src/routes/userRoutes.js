const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.get(
  "/",
  jwtMiddleware.verifyToken,
  jwtMiddleware.verifyAdmin,
  userController.getAllUser
);
router.post("/", userController.createNewUser);
router.get("/:userid", userController.getUserById);
router.put("/:userid", userController.updateUserById);
router.delete("/:userid", userController.deleteUserById);
router.post(
  "/login",
  userController.loginUser,
  jwtMiddleware.generateToken,
  jwtMiddleware.sendToken
);

module.exports = router;
