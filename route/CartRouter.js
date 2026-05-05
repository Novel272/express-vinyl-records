import express from "express";
import { AddToCart } from "../controller/cartController.js";

const CartRouter = express.Router();
CartRouter.post("/add", AddToCart);
CartRouter.get("/cart-count", GetCartCount);
