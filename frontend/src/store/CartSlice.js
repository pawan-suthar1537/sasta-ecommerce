import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddcartItem: (state, action) => {
      state.cart = [...action.payload];
    },
  },
});

export const { AddcartItem } = CartSlice.actions;
export default CartSlice.reducer;
