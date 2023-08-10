import { createRef, useEffect, useState } from "react";
import { decode as decodeMorse, encode as encodeMorse } from "xmorse";
import md5 from "md5";
import QRCode from "qrcode";
import ReactGA from "react-ga4";
import { t } from "i18next";

import { decodeBase64, encodeBase64 } from "@/encodings/base64";
import { decodeBinary, encodeBinary } from "@/encodings/binary";
import { decodeCharCode, encodeCharCode } from "@/encodings/char-code";
import {
	decodeCoreValues,
	encodeCoreValues,
	isCoreValuesEncoded,
} from "@/encodings/core-values";
import {
	decodeHtmlEntities,
	encodeHtmlEntities,
	isHtmlEntitiesEncoded,
} from "@/encodings/html-entities";
import { decodeUnicode, encodeUnicode } from "@/encodings/unicode";

import { setAlertMessage, setImageInfo } from "@/redux/reducers/app";
import Alert from "@/components/Alert";
import DropDown from "@/components/DropDown";
import FileInput from "@/components/FileInput";
import ImageViewer from "@/components/ImageViewer";
import Menu from "@/components/Menu";
import { useAppDispatch } from "@/redux/hooks";

import styles from "@/styles/App.module.css";

import type { ChangeEvent, KeyboardEvent } from "react";
import type { Option } from "@/types";

const md5Hist = {} as Record<string, string>;

function App(): JSX.Element {
	const dispatch = useAppDispatch();

	const [encoding, setEncoding] = useState<string>("base64");
	const [text, setText] = useState<string>("");

	const fileInput = createRef<HTMLInputElement>();

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

	const checkIfTextEmpty = (): boolean => {
		if (!text) {
			dispatch(setAlertMessage({
				text: t("textEmpty"),
				title: t("error"),
			}));
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
					dispatch(setImageInfo({
						alt: t("decodedImage"),
						src: decoded,
					}));
				} else {
					decoded = decodeBase64(decoded.split("base64,")[1]);
				}
			} else if (isOnly(/\.|-|\/|\s/, decoded)) {
				decoded = decodeMorse(decoded.replaceAll(" ", "/"));
			} else if (!decoded.includes(" ")) {
				if (md5Hist[decoded]) {
					decoded = md5Hist[decoded];
					dispatch(setAlertMessage({
						text: t("md5CannotBeDecoded"),
					}));
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
			} else if (isHtmlEntitiesEncoded(decoded)) {
				decoded = decodeHtmlEntities(decoded);
			}
			setText(decoded);
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error);
				dispatch(setAlertMessage({
					text: error.message,
					title: t("error"),
				}));
			}
		}
	};

	const encode = (): void => {
		if (encoding === "dataurl") {
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
		switch (encoding) {
			case "base64":
				setText(encodeBase64(text));
				break;
			case "binary":
				setText(encodeBinary(text));
				break;
			case "charcode":
				setText(encodeCharCode(text));
				break;
			case "corevalues":
				setText(encodeCoreValues(text));
				break;
			case "htmlentities":
				setText(encodeHtmlEntities(text));
				break;
			case "md5":
				((): void => {
					const md5Value = md5(text);
					md5Hist[md5Value] = text;
					setText(md5Value);
				})();
				break;
			case "morse":
				setText(encodeMorse(text));
				break;
			case "qrcode":
				QRCode.toDataURL(text, {
					margin: 2,
				}).then((url) => {
					dispatch(setImageInfo({
						alt: t("qrCode"),
						src: url,
					}));
				}).catch((error: Error) => {
					console.error(error);
					dispatch(setAlertMessage({
						text: error.message,
						title: t("error"),
					}));
				});
				break;
			case "unicode":
				setText(encodeUnicode(text));
				break;
			case "uricomponent":
				setText(encodeURIComponent(text));
				break;
			default:
				break;
		}
	};

	const exportAsFile = (): void => {
		if (checkIfTextEmpty()) {
			return;
		}
		const newA = document.createElement("a");
		newA.href = URL.createObjectURL(new Blob([text], {
			type: "text/plain",
		}));
		newA.download = "encoder.txt";
		newA.click();
	};

	const handleTextChange = (
		event: ChangeEvent<HTMLTextAreaElement>,
	): void => {
		setText(event.target.value);
	};

	const handleTextKeyDown = (
		event: KeyboardEvent<HTMLTextAreaElement>,
	): void => {
		if (event.ctrlKey || event.metaKey) {
			switch (event.key) {
				case "Enter":
					event.preventDefault();
					if (event.shiftKey) {
						decode();
					} else {
						encode();
					}
					break;
				case "o":
					event.preventDefault();
					openLocalFile();
					break;
				case "s":
					event.preventDefault();
					exportAsFile();
					break;
				default:
					break;
			}
		}
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
		setEncoding(newValue);
	};

	const updateText = (newValue: string): void => {
		setText(newValue);
	};

	useEffect(() => {
		setTimeout(() => {
			ReactGA.initialize("G-H0PC8ZZ7BN");
			ReactGA.send("pageview");
		}, 1000);
	}, []);

	return (
		<div className={styles["App"]}>
			<header>
				<h1>{t("encoder")}</h1>
				<Menu
					exportAsFile={exportAsFile}
					openLocalFile={openLocalFile}
				/>
			</header>
			<textarea
				className={styles["text-area"]}
				placeholder={t("enterText").toString()}
				value={text}
				onChange={handleTextChange}
				onKeyDown={handleTextKeyDown}
			></textarea>
			<div className={styles["control-bar"]}>
				<DropDown
					id="encoding-selector"
					label={t("encoding")}
					options={encodingOptions}
					value={encoding}
					updateValue={updateEncoding}
				/>
				<button
					className="default-btn"
					type="button"
					onClick={encode}
				>
					{t("encode")}
				</button>
				<button
					className={styles["regular-btn"]}
					type="button"
					onClick={decode}
				>
					{t("decode")}
				</button>
			</div>
			<FileInput
				ref={fileInput}
				updateText={updateText}
			/>
			<ImageViewer />
			<Alert />
		</div>
	);
}

export default App;
