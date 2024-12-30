import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allcategory: [],
  allsubcategory: [],
  allproduct: [],
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
    setallproduct: (state, action) => {
      state.allproduct = [...action.payload];
    },
  },
});

export const { setallcategory, setallsubcategory, setallproduct } =
  ProductSlice.actions;
export default ProductSlice.reducer;
