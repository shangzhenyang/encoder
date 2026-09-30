import { useStore } from "@/store";
import type { DialogInfo } from "@/types";

export function closeDialog(): void {
	useStore.setState({
		isDialogShown: false,
	});
}

export function showDialog(text: string, options: DialogInfo = {}): void {
	useStore.setState({
		dialog: {
			...options,
			text,
		},
		isDialogShown: true,
	});
}
