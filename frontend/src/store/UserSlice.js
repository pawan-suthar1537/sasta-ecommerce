import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  mobile: "",
  verify_email: "",
  last_login: "",
  status: "",
  address_details: [],
  shopping_cart: [],
  order_history: [],
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.avatar = action.payload?.avatar;
      state.mobile = action.payload?.mobile;
      state.verify_email = action.payload?.verify_email;
      state.last_login = action.payload?.last_login;
      state.status = action.payload?.status;
      state.address_details = action.payload?.address_details;
      state.shopping_cart = action.payload?.shopping_cart;
      state.order_history = action.payload?.order_history;
      state.role = action.payload?.role;
    },
    logout: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.mobile = "";
      state.verify_email = "";
      state.last_login = "";
      state.status = "";
      state.address_details = [];
      state.shopping_cart = [];
      state.order_history = [];
      state.role = "";
    },
    updateavatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setUserDetails, logout, updateavatar } = userSlice.actions;
export default userSlice.reducer;
