import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  updateAccountDetails,
  changeCurrentPassword,
  updateUserAvatar,
  getCurrentUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  requestEmailChange,
} from "../controllers/user.controller.js";
import {
  verifyEmailToken,
  verifyForgotPasswordToken,
  verifyJWT,
} from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secure route
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-user").post(refreshAccessToken);
router.route("/check-auth").get(checkAuth);
router.route("/verify-email").post(verifyEmailToken, verifyEmail);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").patch(verifyForgotPasswordToken, resetPassword);

router.route("/change-password").patch(verifyJWT, changeCurrentPassword);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/request-email-change").patch(verifyJWT, requestEmailChange);
router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

export default router;
