import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
	name: "categories",
	initialState: [],
	reducers: {
		addNewCategory: (state, action) => {
			const idx = state.indexOf(action.payload);
			if (idx == -1) {
					state.push(action.payload);
			}
		},
		deleteCategory: (state, action) => {
			const idx = state.indexOf(action.payload);
			if (idx > -1) {
				console.log(`Deleted ${action.payload}`)
				state.splice(idx, 1);
			}
		}
	}
});

export const { addNewCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;