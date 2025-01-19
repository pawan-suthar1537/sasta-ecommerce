import Addressmodel from "../models/address-model.js";
import { validationResult } from "express-validator";
import Usermodel from "../models/user-model.js";

export const addAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = req.userId;
  console.log("UserId in addAddress", userId);

  const { address_line, city, state, pincode, number } = req.body;

  try {
    const newAddress = new Addressmodel({
      address_line,
      city,
      state,
      pincode,
      number,
    });

    await newAddress.save();
    await Usermodel.findByIdAndUpdate(userId, {
      $push: { address_details: newAddress._id },
    });
    res
      .status(201)
      .json({ success: true, data: newAddress, message: "Address Added" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAddress = async (req, res) => {
  const userId = req.userId;
  console.log("UserId in getAddress", userId);
  try {
    const user = await Usermodel.findById(userId).populate("address_details");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user.address_details });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { address_line, city, state, pincode, number } = req.body;

  try {
    const updatedAddress = await Addressmodel.findByIdAndUpdate(
      id,
      { address_line, city, state, pincode, number },
      { new: true }
    );

    if (!updatedAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    res.status(200).json({ success: true, data: updatedAddress });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteAddress = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const deletedAddress = await Addressmodel.findByIdAndDelete(id);
    await Usermodel.findByIdAndUpdate(userId, {
      $pull: { address_details: id },
    });

    if (!deletedAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found to delete" });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: deletedAddress,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
