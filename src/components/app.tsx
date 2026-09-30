import Analytics from "@/components/analytics";
import FileInput from "@/components/file-input";
import ImageViewer from "@/components/image-viewer";
import Menu from "@/components/menu";
import MessageDialog from "@/components/message-dialog";
import Selector from "@/components/selector";
import { decodeBase64, encodeBase64 } from "@/encodings/base64";
import { decodeBinary, encodeBinary } from "@/encodings/binary";
import { decodeCharCode, encodeCharCode } from "@/encodings/char-code";
import {
	decodeCoreValues,
	encodeCoreValues,
	isCoreValuesEncoded,
} from "@/encodings/core-values";
import {
	decodeHtmlDecimal,
	encodeHtmlDecimal,
	isHtmlDecimalEncoded,
} from "@/encodings/html-decimal";
import {
	decodeHtmlEntities,
	encodeHtmlEntities,
	isHtmlEntitiesEncoded,
} from "@/encodings/html-entities";
import { decodeUnicode, encodeUnicode } from "@/encodings/unicode";
import { useStore } from "@/store";
import type { Option } from "@/types";
import { showDialog } from "@/utils";
import { Button, TextArea, useTheme } from "@heroui/react";
import { t } from "i18next";
import md5 from "md5";
import QRCode from "qrcode";
import type { ChangeEvent, JSX } from "react";
import { useEffect, useRef, useState } from "react";
import { decode as decodeMorse, encode as encodeMorse } from "xmorse";

function App(): JSX.Element {
	useTheme();
	const params = Object.fromEntries(
		new URLSearchParams(window.location.search).entries(),
	) as Record<string, string | undefined>;

	const encodingOptions: Option[] = [
		{
			text: "Base64",
			value: "base64",
		},
		{
			text: t("binary"),
			value: "binary",
		},
		{
			text: t("charCode"),
			value: "charcode",
		},
		{
			text: t("coreValues"),
			value: "corevalues",
		},
		{
			text: "Data URL",
			value: "dataurl",
		},
		{
			text: t("htmlDecimal"),
			value: "htmldecimal",
		},
		{
			text: t("htmlEntities"),
			value: "htmlentities",
		},
		{
			text: "MD5",
			value: "md5",
		},
		{
			text: t("morseCode"),
			value: "morse",
		},
		{
			text: t("qrCode"),
			value: "qrcode",
		},
		{
			text: "Unicode",
			value: "unicode",
		},
		{
			text: "URI Component",
			value: "uricomponent",
		},
	];
	encodingOptions.sort((a, b) => {
		return a.text.localeCompare(b.text);
	});

	const [selectedEncoding, setSelectedEncoding] = useState<string>(
		params.encoding &&
			encodingOptions.some((option) => {
				return option.value === params.encoding;
			})
			? params.encoding
			: "base64",
	);
	const [text, setText] = useState<string>("");

	const fileInput = useRef<HTMLInputElement>(null);
	const md5History = useRef<Record<string, string>>({});

	const checkIfTextEmpty = (): boolean => {
		if (!text) {
			showDialog(t("textEmpty"), {
				title: t("error"),
			});
			return true;
		}
		return false;
	};

	const decode = (): void => {
		if (checkIfTextEmpty()) {
			return;
		}
		let decoded = text;
		try {
			if (decoded.startsWith("data:")) {
				if (decoded.includes("image/")) {
					useStore.setState({
						imageViewerSrc: decoded,
						imageViewerTitle: t("decodedImage"),
						isImageViewerShown: true,
					});
				} else {
					decoded = decodeBase64(decoded.split("base64,")[1]);
				}
			} else if (isOnly(/\.|-|\/|\s/, decoded)) {
				decoded = decodeMorse(decoded.replaceAll(" ", "/"));
			} else if (!decoded.includes(" ")) {
				if (md5History.current[decoded]) {
					decoded = md5History.current[decoded];
					showDialog(t("md5CannotBeDecoded"));
				} else if (isOnly(/0|1/, decoded)) {
					decoded = decodeBinary(decoded);
				} else if (isOnly(/\d/, decoded)) {
					decoded = decodeCharCode(decoded);
				} else if (decoded.includes("%u")) {
					decoded = unescape(decoded);
				} else if (decoded.includes("%")) {
					decoded = decodeURIComponent(decoded);
				} else if (decoded.includes("\\u") || decoded.includes("\\")) {
					decoded = decodeUnicode(decoded);
				} else if (isHtmlEntitiesEncoded(decoded)) {
					decoded = decodeHtmlEntities(decoded);
				} else {
					decoded = decodeBase64(decoded);
				}
			} else if (isOnly(/0|1|\s/, decoded)) {
				decoded = decodeBinary(decoded);
			} else if (isOnly(/\d|\s/, decoded)) {
				decoded = decodeCharCode(decoded);
			} else if (isCoreValuesEncoded(decoded)) {
				decoded = decodeCoreValues(decoded);
			} else if (isHtmlDecimalEncoded(decoded)) {
				decoded = decodeHtmlDecimal(decoded);
			} else if (isHtmlEntitiesEncoded(decoded)) {
				decoded = decodeHtmlEntities(decoded);
			}
			setText(decoded);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
				showDialog(error.message, {
					title: t("error"),
				});
			}
		}
	};

	const encode = async (): Promise<void> => {
		if (selectedEncoding === "dataurl") {
			if (text) {
				setText("data:text/plain;base64," + encodeBase64(text));
			} else {
				openLocalFile();
			}
			return;
		}
		if (checkIfTextEmpty()) {
			return;
		}
		switch (selectedEncoding) {
			case "base64": {
				setText(encodeBase64(text));
				break;
			}
			case "binary": {
				setText(encodeBinary(text));
				break;
			}
			case "charcode": {
				setText(encodeCharCode(text));
				break;
			}
			case "corevalues": {
				setText(encodeCoreValues(text));
				break;
			}
			case "htmldecimal": {
				setText(encodeHtmlDecimal(text));
				break;
			}
			case "htmlentities": {
				setText(encodeHtmlEntities(text));
				break;
			}
			case "md5": {
				const md5Value = md5(text);
				md5History.current[md5Value] = text;
				setText(md5Value);
				break;
			}
			case "morse": {
				setText(encodeMorse(text));
				break;
			}
			case "qrcode": {
				try {
					const url = await QRCode.toDataURL(text, {
						margin: 2,
					});
					useStore.setState({
						imageViewerSrc: url,
						imageViewerTitle: t("qrCode"),
						isImageViewerShown: true,
					});
				} catch (error) {
					if (error instanceof Error) {
						console.error(error);
						showDialog(error.message, {
							title: t("error"),
						});
					}
				}
				break;
			}
			case "unicode": {
				setText(encodeUnicode(text));
				break;
			}
			case "uricomponent": {
				setText(encodeURIComponent(text));
				break;
			}
			default:
				break;
		}
	};

	const exportAsFile = (): void => {
		if (checkIfTextEmpty()) {
			return;
		}
		const newA = document.createElement("a");
		newA.href = URL.createObjectURL(
			new Blob([text], {
				type: "text/plain",
			}),
		);
		newA.download = "encoder.txt";
		newA.click();
	};

	const handleEncodeClick = (): void => {
		void encode();
	};

	const handleTextChange = (
		event: ChangeEvent<HTMLTextAreaElement>,
	): void => {
		setText(event.target.value);
	};

	const isOnly = (regExp: RegExp, str: string): boolean => {
		for (let i = 0; i < str.length; i++) {
			if (!regExp.test(str[i])) {
				return false;
			}
		}
		return true;
	};

	const openLocalFile = (): void => {
		fileInput.current?.click();
	};

	const updateEncoding = (newValue: string): void => {
		setSelectedEncoding(newValue);
		window.history.replaceState(null, "", `?encoding=${newValue}`);
	};

	const updateText = (newValue: string): void => {
		setText(newValue);
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.ctrlKey || event.metaKey) {
				switch (event.key) {
					case "Enter": {
						event.preventDefault();
						if (event.shiftKey) {
							decode();
						} else {
							void encode();
						}
						break;
					}
					case "o": {
						event.preventDefault();
						openLocalFile();
						break;
					}
					case "s": {
						event.preventDefault();
						exportAsFile();
						break;
					}
					default:
						break;
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return (): void => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	});

	return (
		<div className="flex flex-col h-full pb-11 px-[10%]">
			<header className="flex items-center justify-between gap-2.5 my-8">
				<h1 className="text-3xl font-thin">{t("encoder")}</h1>
				<Menu
					exportAsFile={exportAsFile}
					openLocalFile={openLocalFile}
				/>
			</header>
			<TextArea
				aria-label={t("text")}
				className="min-h-0 flex-1 resize-none px-4 py-3 sm:text-base"
				fullWidth
				onChange={handleTextChange}
				placeholder={t("enterText")}
				value={text}
			/>
			<div className="mt-4 flex flex-col items-stretch gap-2.5 md:flex-row md:items-end">
				<Selector
					id="encoding-selector"
					label={t("encoding")}
					options={encodingOptions}
					updateValue={updateEncoding}
					value={selectedEncoding}
				/>
				<Button
					className="w-full px-10 md:w-auto"
					onPress={handleEncodeClick}
					size="lg"
				>
					{t("encode")}
				</Button>
				<Button
					className="w-full px-10 md:w-auto"
					onPress={decode}
					size="lg"
					variant="secondary"
				>
					{t("decode")}
				</Button>
			</div>
			<FileInput
				ref={fileInput}
				updateText={updateText}
			/>
			<ImageViewer />
			<MessageDialog />
			<Analytics />
		</div>
	);
}

export default App;
