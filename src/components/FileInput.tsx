import { forwardRef } from "react";
import { t } from "i18next";

import type { ChangeEvent, ForwardedRef } from "react";
import type AlertMessage from "@/types/AlertMessage";

interface Props {
	updateAlertMessage: (newValue: AlertMessage | null) => void;
	updateText: (newValue: string) => void;
}

function FileInput(
	{ updateAlertMessage, updateText }: Props,
	ref: ForwardedRef<HTMLInputElement>
) {
	const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const file = evt.target.files?.[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			updateText(reader.result as string);
		};
		if (file.type.startsWith("image/")) {
			reader.readAsDataURL(file);
		} else if (file.type.startsWith("text/")) {
			reader.readAsText(file);
		} else {
			updateAlertMessage({
				title: t("error"),
				text: t("unsupportedFileType")
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
