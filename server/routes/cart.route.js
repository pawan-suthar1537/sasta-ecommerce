import { AddtoCart, GetCartItems } from "../controller/cart.controller.js";
import { Auth } from "../middlewares/auth.js";

import express from "express";
const cartrouter = express.Router();

// Cart routes
cartrouter.post("/addtocart", Auth, AddtoCart);
cartrouter.get("/getmycart", Auth, GetCartItems);

export default cartrouter;
