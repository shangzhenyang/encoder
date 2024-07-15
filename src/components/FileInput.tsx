import { useAppDispatch } from "@/redux/hooks";
import { setAlertMessage } from "@/redux/reducers/app";
import { t } from "i18next";
import { ChangeEvent, ForwardedRef, forwardRef } from "react";

interface FileInputProps {
	updateText: (newValue: string) => void;
}

function FileInput(
	{ updateText }: FileInputProps,
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
			dispatch(
				setAlertMessage({
					text: t("unsupportedFileType"),
					title: t("error"),
				}),
			);
		}
	};

	return (
		<input
			accept="image/*,text/*"
			hidden
			onChange={handleFileChange}
			ref={ref}
			type="file"
		/>
	);
}

export default forwardRef(FileInput);
