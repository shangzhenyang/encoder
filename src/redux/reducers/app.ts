import { createSlice } from "@reduxjs/toolkit";

import type { AlertMessage, ImageInfo } from "@/types";

const initialState = {
	alertMessage: {} as AlertMessage,
	imageInfo: {} as ImageInfo,
};

const slice = createSlice({
	initialState,
	name: "app",
	reducers: {
		setAlertMessage: (state, action) => {
			const newValue = action.payload as AlertMessage;
			state.alertMessage = newValue;
		},
		setImageInfo: (state, action) => {
			const newValue = action.payload as ImageInfo;
			state.imageInfo = newValue;
		},
	},
});

export const {
	setAlertMessage,
	setImageInfo,
} = slice.actions;
export default slice.reducer;
