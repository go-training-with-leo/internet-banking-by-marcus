import { createSlice } from '@reduxjs/toolkit';

import { signIn } from './thunk';

const auth = createSlice({
  name: 'authentication',

  initialState: {
    currentUser: {},
    isLoading: false,
    isFetched: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },

  extraReducers: {
    [signIn.pending]: (state) => {
      state.isLoading = true;
    },
    [signIn.rejected]: (state) => {
      state.isLoading = false;
    },
    [signIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentUser = action?.payload?.data;
    },
  },
});

export const { setUser } = auth.actions;

export default auth.reducer;
