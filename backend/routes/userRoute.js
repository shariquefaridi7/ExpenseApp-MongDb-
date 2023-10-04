import express from "express";
import { signupData,signinData ,ResetPass,ForgotPass,updateUser} from "../controllers/userController.js";
import authen from "../middleware/authen.js";

const router=express.Router();

router.post("/signup",signupData);
router.post("/signin",signinData);
router.post("/forgot-password",ForgotPass);
router.post("/reset-password/:id",authen,ResetPass);
router.put("/:userId",updateUser)

export  default router;