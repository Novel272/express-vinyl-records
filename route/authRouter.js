import {
  AuthController,
  loginUser,
  LogOutUser,
} from "../controller/authController";
import express from "express";

const AuthRouter = express.Router();

AuthRouter.post("/register", AuthController);
AuthRouter.post("/login", loginUser);
AuthRouter.get("/logout", LogOutUser);

export default AuthRouter;
