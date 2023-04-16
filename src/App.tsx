import {
	ChangeEvent,
	createRef,
	KeyboardEvent,
	useEffect,
	useState
} from "react";
import { t } from "i18next";
import md5 from "md5";
import QRCode from "qrcode";
import { decode as decodeMorse, encode as encodeMorse } from "xmorse";
import ReactGA from "react-ga4";

import { decodeBase64, encodeBase64 } from "@/encodings/base64";
import { decodeBinary, encodeBinary } from "@/encodings/binary";
import {
	decodeCoreValues,
	isCoreValuesEncoded,
	encodeCoreValues
} from "@/encodings/core-values";
import { decodeCharCode, encodeCharCode } from "@/encodings/char-code";
import { decodeUnicode, encodeUnicode } from "@/encodings/unicode";

import Alert from "@/components/Alert";
import DropDown from "@/components/DropDown";
import FileInput from "@/components/FileInput";
import ImageViewer from "@/components/ImageViewer";
import Menu from "@/components/Menu";

import styles from "@/styles/App.module.css";

import type AlertMessage from "@/types/AlertMessage";
import type ImageInfo from "@/types/ImageInfo";
import type Option from "@/types/Option";

const md5Hist = new Map();

function App() {
	const [alertMessage, setAlertMessage] =
		useState(null as AlertMessage | null);
	const [encoding, setEncoding] = useState("base64");
	const [imageInfo, setImageInfo] = useState(null as ImageInfo | null);
	const [text, setText] = useState("");

	const fileInput = createRef<HTMLInputElement>();

	const encodingOptions: Option[] = [{
		text: "Base64",
		value: "base64"
	}, {
		text: t("binary"),
		value: "binary"
	}, {
		text: t("qrCode"),
		value: "qrcode"
	}, {
		text: t("coreValues"),
		value: "corevalues"
	}, {
		text: t("morseCode"),
		value: "morse"
	}, {
		text: t("charCode"),
		value: "charcode"
	}, {
		text: "Data URL",
		value: "dataurl"
	}, {
		text: "MD5",
		value: "md5"
	}, {
		text: "Unicode",
		value: "unicode"
	}, {
		text: "URI Component",
		value: "uricomponent"
	}];

	const checkIfTextEmpty = () => {
		if (!text) {
			setAlertMessage({
				title: t("error"),
				text: t("textEmpty")
			});
			return true;
		}
		return false;
	};

	const decode = () => {
		if (checkIfTextEmpty()) {
			return;
		}
		let decoded = text;
		try {
			if (decoded.startsWith("data:")) {
				if (decoded.includes("image/")) {
					setImageInfo({
						src: decoded,
						alt: t("decodedImage")
					});
				} else {
					decoded = decodeBase64(decoded.split("base64,")[1]);
				}
			} else if (isOnly(/\.|-|\/|\s/, decoded)) {
				decoded = decodeMorse(decoded.replaceAll(" ", "/"));
			} else if (!decoded.includes(" ")) {
				if (md5Hist.has(decoded)) {
					decoded = md5Hist.get(decoded);
					setAlertMessage({
						title: t("tip"),
						text: t("md5CannotBeDecoded")
					});
				} else if (isOnly(/0|1/, decoded)) {
					decoded = parseInt(decoded, 2).toString();
				} else if (decoded.includes("%u")) {
					decoded = unescape(decoded);
				} else if (decoded.includes("%")) {
					decoded = decodeURIComponent(decoded);
				} else if (decoded.includes("\\u") || decoded.includes("\\")) {
					decoded = decodeUnicode(decoded);
				} else {
					decoded = decodeBase64(decoded);
				}
			} else if (isOnly(/0|1|\s/, decoded)) {
				decoded = decodeBinary(decoded);
			} else if (isOnly(/\d|\s/, decoded)) {
				decoded = decodeCharCode(decoded);
			} else if (isCoreValuesEncoded(decoded)) {
				decoded = decodeCoreValues(decoded);
			}
			setText(decoded);
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err);
				setAlertMessage({
					title: t("error"),
					text: err.message
				});
			}
		}
	};

	const encode = () => {
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
			case "md5":
				(() => {
					const md5Value = md5(text);
					md5Hist.set(md5Value, text);
					setText(md5Value);
				})();
				break;
			case "morse":
				setText(encodeMorse(text));
				break;
			case "qrcode":
				QRCode.toDataURL(text, {
					margin: 2
				}).then((url) => {
					setImageInfo({
						src: url,
						alt: t("qrCode")
					});
				}).catch((err: Error) => {
					console.error(err);
					setAlertMessage({
						title: t("error"),
						text: err.message
					});
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

	const exportAsFile = () => {
		if (checkIfTextEmpty()) {
			return;
		}
		const newA = document.createElement("a");
		newA.href = URL.createObjectURL(new Blob([text], {
			type: "text/plain"
		}));
		newA.download = "encoder.txt";
		newA.click();
	};

	const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
		setText(evt.target.value);
	};

	const handleTextKeyDown = (evt: KeyboardEvent<HTMLTextAreaElement>) => {
		if (evt.ctrlKey || evt.metaKey) {
			switch (evt.key) {
				case "Enter":
					evt.preventDefault();
					if (evt.shiftKey) {
						decode();
					} else {
						encode();
					}
					break;
				case "o":
					evt.preventDefault();
					openLocalFile();
					break;
				case "s":
					evt.preventDefault();
					exportAsFile();
					break;
				default:
					break;
			}
		}
	};

	const isOnly = (regExp: RegExp, str: string) => {
		for (let i = 0; i < str.length; i++) {
			if (!regExp.test(str[i])) {
				return false;
			}
		}
		return true;
	};

	const openLocalFile = () => {
		fileInput.current?.click();
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
					setAlertMessage={setAlertMessage}
				/>
			</header>
			<textarea
				className={styles["text-area"]}
				autoFocus={true}
				placeholder={t("enterText").toString()}
				value={text}
				onChange={handleTextChange}
				onKeyDown={handleTextKeyDown}>
			</textarea>
			<div className={styles["control-bar"]}>
				<DropDown
					id="encoding-selector"
					label={t("encoding")}
					options={encodingOptions}
					value={encoding}
					setValue={setEncoding}
				/>
				<button
					className="default-btn"
					type="button"
					onClick={encode}>
					{t("encode")}
				</button>
				<button
					className={styles["regular-btn"]}
					type="button"
					onClick={decode}>
					{t("decode")}
				</button>
			</div>
			<FileInput
				ref={fileInput}
				setText={setText}
				setAlertMessage={setAlertMessage}
			/>
			<ImageViewer
				imageInfo={imageInfo}
				setImageInfo={setImageInfo}
			/>
			<Alert
				alertMessage={alertMessage}
				setAlertMessage={setAlertMessage}
			/>
		</div>
	);
}

export default App;
