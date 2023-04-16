import {
	ChangeEvent,
	Dispatch,
	forwardRef,
	ForwardedRef,
	SetStateAction
} from "react";
import { t } from "i18next";

import type AlertMessage from "@/types/AlertMessage";

interface Props {
	setText: Dispatch<SetStateAction<string>>;
	setAlertMessage: Dispatch<SetStateAction<AlertMessage | null>>;
}

function FileInput(
	{ setText, setAlertMessage }: Props,
	ref: ForwardedRef<HTMLInputElement>
) {
	const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const file = evt.target.files?.[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setText(reader.result as string);
		};
		if (file.type.startsWith("image/")) {
			reader.readAsDataURL(file);
		} else if (file.type.startsWith("text/")) {
			reader.readAsText(file);
		} else {
			setAlertMessage({
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
