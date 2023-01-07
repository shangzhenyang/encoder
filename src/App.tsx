import { ChangeEvent, createRef, useEffect, useState } from "react";
import { t } from "i18next";

import Alert from "./components/Alert";
import AlertMessage from "./interfaces/AlertMessage";
import DropDown from "./components/DropDown";
import Menu from "./components/Menu";
import Option from "./interfaces/Option";

function App() {
	const [alertMessage, setAlertMessage] = useState(null as AlertMessage | null);
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
			/>
			<button className="default-btn">{t("encode")}</button>
			<button className="regular-btn">{t("decode")}</button>
		</div>
		<Alert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
	</div>
}

export default App;
