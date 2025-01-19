import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: [],
};

const AddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setAddress } = AddressSlice.actions;
export default AddressSlice.reducer;
