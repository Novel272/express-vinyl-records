import { AuthController } from "../controller/authController";
import express from "express";

const AuthRouter = express.Router();

AuthRouter.post("/register", AuthController);

export default AuthRouter;
