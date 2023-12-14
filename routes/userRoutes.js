const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch("/resetPassword/:token", authController.resetPassword);
router.post("/forgotPassword", authController.forgotPassword);

router.use(authController.protect);

router.post("/logout", authController.logOut);
router.get("/me", userController.getMe, userController.getUser);

router.patch(
  "/updateMyPassword",

  authController.updatePassword
);

router.patch("/updateMe", userController.updateMe);

router.use(authController.restrictTo('admin'))

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.patchUser)
  .delete(userController.deleteUser);

module.exports = router;
