import babelPlugin from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	build: {
		target: "esnext",
	},
	plugins: [
		react(),
		babelPlugin({
			presets: [reactCompilerPreset()],
		}),
		tailwindcss(),
		VitePWA({
			manifest: {
				description:
					"Encoder is a web-based tool that allows you to easily encode text into various formats, including base64, binary, MD5, Morse code, QR code, Unicode, URI Component, and more.",
				icons: [
					{
						purpose: "any",
						sizes: "720x720",
						src: "https://www.shangzhenyang.com/images/avatar.png",
						type: "image/png",
					},
				],
				id: "/",
				name: "Encoder",
				short_name: "Encoder",
				theme_color: "#006fee",
			},
			registerType: "autoUpdate",
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
