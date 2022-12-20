const { createSlice } = require('@reduxjs/toolkit');

const auth = createSlice({
	name: 'authentication',

	initialState: {
		isLoading: false,
		currentUser: {},
	},

	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = auth.actions;

export default auth.reducer;
