import { forwardRef } from "react";
import { t } from "i18next";

import { setAlertMessage } from "@/redux/reducers/app";
import { useAppDispatch } from "@/redux/hooks";

import type { ChangeEvent, ForwardedRef } from "react";

interface Props {
	updateText: (newValue: string) => void;
}

function FileInput(
	{ updateText }: Props,
	ref: ForwardedRef<HTMLInputElement>,
): JSX.Element {
	const dispatch = useAppDispatch();

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
			dispatch(setAlertMessage({
				text: t("unsupportedFileType"),
				title: t("error"),
			}));
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
