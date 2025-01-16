import {
  AddtoCart,
  GetCartItems,
  UpdateQty,
} from "../controller/cart.controller.js";
import { Auth } from "../middlewares/auth.js";

import express from "express";
const cartrouter = express.Router();

// Cart routes
cartrouter.post("/addtocart", Auth, AddtoCart);
cartrouter.get("/getmycart", Auth, GetCartItems);
cartrouter.put("/updatecart", Auth, UpdateQty);

export default cartrouter;
