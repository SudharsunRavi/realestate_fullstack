import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false; 
    },
    updatedUser: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    deleteUser: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setLoading, setError, updatedUser } = userSlice.actions;
export default userSlice.reducer;