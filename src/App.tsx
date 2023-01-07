import {
	ChangeEvent,
	createRef,
	KeyboardEvent,
	useEffect,
	useState
} from "react";
import { t } from "i18next";
import md5 from "md5";
import { decode as decodeMorse, encode as encodeMorse } from "xmorse";

import { decodeBinary, encodeBinary } from "./utils/binary";
import {
	decodeCoreValues,
	isCoreValuesEncoded,
	encodeCoreValues
} from "./utils/core-values";
import { decodeUnicode, encodeUnicode } from "./utils/unicode";

import Alert from "./components/Alert";
import AlertMessage from "./interfaces/AlertMessage";
import DropDown from "./components/DropDown";
import FileInput from "./components/FileInput";
import Menu from "./components/Menu";
import Option from "./interfaces/Option";

const md5Hist = new Map();

function App() {
	const [alertMessage, setAlertMessage] = useState(null as AlertMessage | null);
	const [encoding, setEncoding] = useState("base64");
	const [text, setText] = useState("");

	const fileInput = createRef<HTMLInputElement>();
	const textInput = createRef<HTMLTextAreaElement>();

	const encodingOptions: Option[] = [{
		text: "Base64",
		value: "base64"
	}, {
		text: t("binary"),
		value: "binary"
	}, {
		text: t("qrCode"),
		value: "qrCode"
	}, {
		text: t("coreValues"),
		value: "corevalues"
	}, {
		text: t("morseCode"),
		value: "morse"
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

	function decode() {
		if (!text) {
			return;
		}
		let decoded = text;
		try {
			if (decoded.startsWith("data:")) {
				if (decoded.includes("image/")) {
					window.open(decoded);
				} else {
					decoded = window.atob(decoded.split("base64,")[1]);
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
					decoded = decodeURIComponent(escape(window.atob(decoded)));
				}
			} else if (isOnly(/0|1|\s/, decoded)) {
				decoded = decodeBinary(decoded);
			} else if (isCoreValuesEncoded(decoded)) {
				decoded = decodeCoreValues(decoded);
			}
			setText(decoded);
		} catch (err: any) {
			console.error(err);
			setAlertMessage({
				title: t("error"),
				text: err.message
			});
		}
	}

	function encode() {
		if (encoding === "dataurl") {

		}
		if (!text) {
			return;
		}
		switch (encoding) {
			case "base64":
				try {
					setText(window.btoa(text));
				} catch {
					setText(window.btoa(unescape(encodeURIComponent(text))));
				}
				break;
			case "binary":
				setText(encodeBinary(text));
				break;
			case "corevalues":
				setText(encodeCoreValues(text));
				break;
			case "md5":
				const md5Value = md5(text);
				md5Hist.set(md5Value, text);
				setText(md5Value);
				break;
			case "morse":
				setText(encodeMorse(text));
				break;
			case "qrcode":
				// showQrCode(value);
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
	}

	function exportAsFile() {
		const newA = document.createElement("a");
		newA.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
		newA.download = `encoder-${Date.now()}.txt`;
		newA.click();
	}

	function handleTextChange(evt: ChangeEvent<HTMLTextAreaElement>) {
		setText(evt.target.value);
	}

	function handleTextKeyDown(evt: KeyboardEvent<HTMLTextAreaElement>) {
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
	}

	function isOnly(regExp: RegExp, str: string) {
		for (let i = 0; i < str.length; i++) {
			if (!regExp.test(str[i])) {
				return false;
			}
		}
		return true;
	}

	function openLocalFile() {
		fileInput.current?.click();
	}

	useEffect(() => {
		const allowedHostNames = [
			"localhost",
			"encoder.shangzhenyang.com",
			"encoder.yangshangzhen.com"
		];
		if (!allowedHostNames.includes(window.location.hostname)) {
			window.location.href = "https://encoder.shangzhenyang.com/";
			return;
		}

		const isMobile = navigator.userAgent.includes("Android") ||
			navigator.userAgent.includes("iPhone") ||
			navigator.userAgent.includes("iPad");
		if (!isMobile) {
			textInput.current?.focus();
		}
	}, [textInput]);

	return <div className="App">
		<header>
			<h1>{t("encoder")}</h1>
			<Menu
				exportAsFile={exportAsFile}
				openLocalFile={openLocalFile}
				setAlertMessage={setAlertMessage}
			/>
		</header>
		<textarea
			ref={textInput}
			placeholder={t("enterText").toString()}
			value={text}
			onChange={handleTextChange}
			onKeyDown={handleTextKeyDown}>
		</textarea>
		<div className="control-bar">
			<DropDown
				id="encoding-selector"
				label={t("encoding")}
				options={encodingOptions}
				value={encoding}
				setValue={setEncoding}
			/>
			<button
				className="default-btn"
				onClick={encode}>
				{t("encode")}
			</button>
			<button
				className="regular-btn"
				onClick={decode}>
				{t("decode")}
			</button>
		</div>
		<FileInput
			ref={fileInput}
			setText={setText}
			setAlertMessage={setAlertMessage}
		/>
		<Alert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
	</div>
}

export default App;
