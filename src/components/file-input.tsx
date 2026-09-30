import { showDialog } from "@/utils";
import { t } from "i18next";
import type { ChangeEvent, JSX, Ref } from "react";

interface FileInputProps {
	ref: Ref<HTMLInputElement>;
	updateText: (newValue: string) => void;
}

function FileInput({ ref, updateText }: FileInputProps): JSX.Element {
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
			showDialog(t("unsupportedFileType"), {
				title: t("error"),
			});
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

export default FileInput;
