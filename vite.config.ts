import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import eslint from "@rollup/plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return "vendor";
					}
				}
			}
		}
	},
	css: {
		postcss: {
			plugins: [autoprefixer]
		}
	},
	plugins: [
		react(),
		{
			...eslint({
				include: ["src/**/*.{ts,tsx}"]
			}),
			enforce: "pre"
		},
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Encoder",
				short_name: "Encoder",
				id: "/",
				theme_color: "#0066cc",
				description: "Encoder is a web-based tool that allows you to easily encode text into various formats, including base64, binary, MD5, Morse code, QR code, Unicode, URI Component, and more.",
				icons: [{
					src: "https://www.shangzhenyang.com/images/avatar.png",
					sizes: "720x720",
					type: "image/png",
					purpose: "any"
				}]
			}
		})
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	}
});
