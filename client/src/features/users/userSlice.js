import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInError: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInError, signInSuccess, signInStart } = userSlice.actions;
export default userSlice;
