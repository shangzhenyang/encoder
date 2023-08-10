import { configureStore } from "@reduxjs/toolkit";

import appReducer from "@/redux/reducers/app";

const store = configureStore({
	devTools: false,
	reducer: {
		app: appReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
