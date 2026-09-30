import type { DialogInfo } from "@/types";
import { create } from "zustand";

interface StoreStateInfo {
	dialog: DialogInfo;
	imageViewerSrc: string;
	imageViewerTitle: string;
	isDialogShown: boolean;
	isImageViewerShown: boolean;
}

export const useStore = create<StoreStateInfo>()(() => {
	return {
		dialog: {},
		imageViewerSrc: "",
		imageViewerTitle: "",
		isDialogShown: false,
		isImageViewerShown: false,
	};
});
