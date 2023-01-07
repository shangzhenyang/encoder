import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import i18n, { t } from "i18next";

import App from "./App";

import translationEnUs from "./translations/en-us.json";
import translationZhCn from "./translations/zh-cn.json";
import translationZhTw from "./translations/zh-tw.json";

import "./index.css";

const i18nResources = {
	"en-US": {
		translation: translationEnUs
	},
	"zh-CN": {
		translation: translationZhCn
	},
	"zh-TW": {
		translation: translationZhTw
	}
};

const lang = (() => {
	if (
		!navigator.language ||
		/^(yue|zh)(-cn|-hans(-[a-z]+)?)?$/i.test(navigator.language) ||
		(/bot|spider/i.test(navigator.userAgent) && !navigator.userAgent.includes("Googlebot"))
	) {
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
		escapeValue: false
	}
});

document.documentElement.lang = lang;
document.title = t("encoder");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>
);