import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentUser: null,
  loading: false,
  error: '',
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
      state.loading = false;
      state.error = action.payload;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { signInError, signInSuccess, signInStart, updateCurrentUser } =
  userSlice.actions;
export default userSlice.reducer;
