import { forwardRef } from "react";
import { t } from "i18next";

import type { ChangeEvent, ForwardedRef } from "react";
import type { AlertMessage } from "@/types";

interface Props {
	updateAlertMessage: (newValue: AlertMessage | null) => void;
	updateText: (newValue: string) => void;
}

function FileInput(
	{ updateAlertMessage, updateText }: Props,
	ref: ForwardedRef<HTMLInputElement>,
): JSX.Element {
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const file = event.target.files?.[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.onload = (): void => {
			updateText(reader.result as string);
		};
		if (file.type.startsWith("image/")) {
			reader.readAsDataURL(file);
		} else if (file.type.startsWith("text/")) {
			reader.readAsText(file);
		} else {
			updateAlertMessage({
				title: t("error"),
				text: t("unsupportedFileType"),
			});
		}
	};

	return (
		<input
			ref={ref}
			accept="image/*,text/*"
			type="file"
			onChange={handleFileChange}
		/>
	);
}

export default forwardRef(FileInput);
