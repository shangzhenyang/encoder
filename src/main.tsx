import App from "@/components/App";
import store from "@/redux/store";
import "@/styles/globals.css";
import translationEnUs from "@/translations/en-us.json";
import translationZhCn from "@/translations/zh-cn.json";
import translationZhTw from "@/translations/zh-tw.json";
import { NextUIProvider } from "@nextui-org/react";
import i18n, { t } from "i18next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

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
	if (/^(yue|zh)(-cn|-sg|-hans(-[a-z]+)?)?$/i.test(navigator.language)) {
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

await i18n.init({
	fallbackLng: "en-US",
	interpolation: {
		escapeValue: false,
	},
	lng: lang,
	resources: i18nResources,
});

document.documentElement.lang = lang;
document.title = t("encoderByShangzhen");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<ReduxProvider store={store}>
			<NextUIProvider>
				<NextThemesProvider attribute="class">
					<App />
				</NextThemesProvider>
			</NextUIProvider>
		</ReduxProvider>
	</StrictMode>,
);
