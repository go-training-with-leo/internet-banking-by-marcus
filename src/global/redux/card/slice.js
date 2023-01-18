import { createSlice } from '@reduxjs/toolkit';
import { getPayingCard } from './thunk';

const card = createSlice({
  name: 'card',
  initialState: {
    cards: [],
    payingCard: {},
    isLoading: false,
    isFetched: false,
  },
  reducers: {
    setPayingCard: (state, action) => {
      state.payingCard = action.payload;
    },
  },
  extraReducers: {
    [getPayingCard.pending]: (state) => {
      state.isLoading = true;
    },
    [getPayingCard.rejected]: (state) => {
      state.isLoading = false;
    },
    [getPayingCard.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.payingCard = action.payload.payingCardInfo;
    },
  },
});

export const { setPayingCard } = card.actions;
export default card.reducer;
