import { AlertMessage, ImageInfo } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	alertMessage: {} as AlertMessage,
	imageInfo: {} as ImageInfo,
};

const slice = createSlice({
	initialState: initialState,
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

export const { setAlertMessage, setImageInfo } = slice.actions;
export default slice.reducer;
