const { createSlice } = require('@reduxjs/toolkit');

const account = createSlice({
  name: 'account',
  initialState: {
    account: [],
    isLoading: false,
    isFetched: false,
  },
});

export default account.reducer;
