import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allcategory: [],
  allsubcategory: [],
  product: [],
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setallcategory: (state, action) => {
      state.allcategory = [...action.payload];
    },
    setallsubcategory: (state, action) => {
      state.allsubcategory = [...action.payload];
    },
  },
});

export const { setallcategory, setallsubcategory } = ProductSlice.actions;
export default ProductSlice.reducer;
