import { createSlice } from '@reduxjs/toolkit';
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
    },
    [getCards.fulfilled]: (state, action) => {
      state.payingCard = action.payload.payingCard;
      state.savingCards = [...action.payload.savingCards];
      state.isLoading = false;
    },
  },
});

export const { resetCards } = card.actions;
export default card.reducer;
