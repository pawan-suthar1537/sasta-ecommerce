import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allcategory: [],
  subcategory: [],
  product: [],
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setallcategory: (state, action) => {
      state.allcategory = [...action.payload];
    },
  },
});

export const { setallcategory } = ProductSlice.actions;
export default ProductSlice.reducer;
