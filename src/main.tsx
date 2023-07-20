import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import i18n, { t } from "i18next";
import Modal from "react-modal";

import App from "@/App";

import translationEnUs from "@/translations/en-us.json";
import translationZhCn from "@/translations/zh-cn.json";
import translationZhTw from "@/translations/zh-tw.json";

import "@/styles/globals.css";

const i18nResources = {
	"en-US": {
		translation: translationEnUs,
	},
	"zh-CN": {
		translation: translationZhCn,
	},
	"zh-TW": {
		translation: translationZhTw,
	},
};

const lang = ((): string => {
	if (/^(yue|zh)(-cn|-hans(-[a-z]+)?)?$/i.test(navigator.language)) {
		return "zh-CN";
	} else if (
		navigator.language.startsWith("zh") ||
		navigator.language.startsWith("yue")
	) {
		return "zh-TW";
	} else {
		return "en-US";
	}
})();

i18n.init({
	resources: i18nResources,
	lng: lang,
	fallbackLng: "en-US",
	interpolation: {
		escapeValue: false,
	},
});

document.documentElement.lang = lang;
document.title = t("encoderByShangzhen");
Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
