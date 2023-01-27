import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/thunk';
import { getCards } from './thunk';

const card = createSlice({
  name: 'card',
  initialState: {
    payingCard: {},
    savingCards: [],
    isLoading: false,
    isFetched: false,
  },
  reducers: {
    resetCards: (state) => {
      state.payingCard = {};
      state.savingCards = [];
    },
  },
  extraReducers: {
    [getCards.pending]: (state) => {
      state.isLoading = true;
    },
    [getCards.rejected]: (state) => {
      state.isLoading = false;
      state.isFetched = false;
    },
    [getCards.fulfilled]: (state, action) => {
      if (action.payload.payingCard) {
        state.payingCard = { ...action.payload.payingCard[0] };
        state.savingCards = [...action.payload.savingCards];
        state.isFetched = true;
        state.isLoading = false;
      }
    },
    [logOut.fulfilled]: (state) => {
      state.isFetched = false;
    },
  },
});

export const { resetCards } = card.actions;
export default card.reducer;
