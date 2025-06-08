import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlerware.js";

const router = Router();
//register
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
//login
router.route("/login").post(loginUser);

//logout
router.route("/logout").post(verifyJWT, logoutUser);
export default router;
