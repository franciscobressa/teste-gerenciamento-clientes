import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
  },
  reducers: {
    setUsersList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setUsersList } = userSlice.actions;

export default userSlice.reducer;
