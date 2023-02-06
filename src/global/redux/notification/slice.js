import { createSlice } from '@reduxjs/toolkit';
import { getAllNotifs } from './thunk';

const notification = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    isLoading: false,
    isFetched: false,
  },
  reducers: {
    updateNotif: (state, action) => {
      state.notifications = [
        action.payload.notification,
        ...state.notifications,
      ];
    },
  },
  extraReducers: {
    [getAllNotifs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllNotifs.rejected]: (state) => {
      state.isLoading = false;
    },
    [getAllNotifs.fulfilled]: (state, action) => {
      state.notifications = [...action.payload.allNotifs];
      state.isFetched = true;
      state.isLoading = false;
    },
  },
});

export default notification.reducer;
