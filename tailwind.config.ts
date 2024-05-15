import { nextui } from "@nextui-org/react";
import { Config } from "tailwindcss/types/config";

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	plugins: [nextui()],
	theme: {
		extend: {},
	},
} as Config;
