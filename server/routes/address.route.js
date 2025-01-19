import express from "express";

import {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} from "../controller/address.controller.js";
import { Auth } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/add",
  Auth,

  addAddress
);

router.get("/", Auth, getAddress);

router.put(
  "/:id",
  Auth,

  updateAddress
);

router.delete("/:id", Auth, deleteAddress);

export default router;
