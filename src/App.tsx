import { ChangeEvent, createRef, useEffect, useState } from "react";
import { t } from "i18next";
import md5 from "md5";
import { decode as decodeMorse, encode as encodeMorse } from "xmorse";

import Alert from "./components/Alert";
import AlertMessage from "./interfaces/AlertMessage";
import DropDown from "./components/DropDown";
import Menu from "./components/Menu";
import Option from "./interfaces/Option";

const md5Hist = new Map();

function App() {
	const [alertMessage, setAlertMessage] = useState(null as AlertMessage | null);
	const [encoding, setEncoding] = useState("base64");
	const [text, setText] = useState("");

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

	function addZero(num: string, length: number) {
		return (Array(length).join("0") + (num || "0")).slice(-length);
	}

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

	function decodeBinary(str: string) {
		const binaries = str.trim().split(" ");
		let result = "";
		for (let i = 0; i < binaries.length; i++) {
			result += String.fromCharCode(parseInt(binaries[i], 2));
		}
		return result;
	}

	function decodeUnicode(unicode: string) {
		return unicode.replace(/\\u?([\d\w]{4})/gi, (_match, group) => {
			return String.fromCharCode(parseInt(group, 16));
		});
	}

	function encode() {
		if (encoding === "dataurl") {

		}
		if (!text) {
			return;
		}
		switch (encoding) {
			case "binary":
				setText(encodeBinary(text));
				break;
			case "morse":
				setText(encodeMorse(text));
				break;
			case "qrcode":
				// showQrCode(value);
				break;
			case "base64":
				try {
					setText(window.btoa(text));
				} catch {
					setText(window.btoa(unescape(encodeURIComponent(text))));
				}
				break;
			case "md5":
				const md5Value = md5(text);
				md5Hist.set(md5Value, text);
				setText(md5Value);
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

	function encodeBinary(str: string) {
		const numRegExp = /\d+/;
		let binary = "";
		if (isOnly(numRegExp, str)) {
			binary = parseInt(str).toString(2);
		} else {
			for (let i = 0; i < str.length; i++) {
				binary += str.charCodeAt(i).toString(2) + " ";
			}
		}
		return binary.trim();
	}

	function encodeUnicode(str: string, separator: string = "\\") {
		let unicode = "";
		for (let i = 0; i < str.length; i++) {
			let charCode = str.charCodeAt(i).toString(16).toUpperCase();
			if (charCode.length < 4) {
				charCode = addZero(charCode, 4);
			}
			unicode += separator + "u" + charCode;
		}
		return unicode;
	}

	function isOnly(regExp: RegExp, str: string) {
		let passed = "";
		for (let i = 0; i < str.length; i++) {
			if (regExp.test(str[i])) {
				passed += str[i];
			}
		}
		return passed === str;
	}

	function textOnChange(evt: ChangeEvent<HTMLTextAreaElement>) {
		setText(evt.target.value);
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
			<Menu setAlertMessage={setAlertMessage} />
		</header>
		<textarea
			ref={textInput}
			placeholder={t("enterText").toString()}
			value={text}
			onChange={textOnChange}>
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
		<Alert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
	</div>
}

export default App;
