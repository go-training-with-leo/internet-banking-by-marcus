const { createSlice } = require('@reduxjs/toolkit');

const auth = createSlice({
	name: 'authentication',

	initialState: {
		isLoading: false,
		currentUser: { name: 'fas' },
	},

	reducers: {
		setUser: (state, action) => {
			state.currentUser = action.payload;
		},
	},
});

export const { setUser } = auth.actions;

export default auth.reducer;
