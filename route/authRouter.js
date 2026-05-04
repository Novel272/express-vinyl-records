import { AuthController, loginUser } from "../controller/authController";
import express from "express";

const AuthRouter = express.Router();

AuthRouter.post("/register", AuthController);
AuthRouter.post("/login", loginUser);

export default AuthRouter;
