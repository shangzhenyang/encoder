import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Encoder",
				short_name: "Encoder",
				id: "/",
				theme_color: "#ffffff",
				description: "Encoder is a web-based tool that allows you to easily encode text into various formats, including base64, binary, MD5, Morse code, QR code, Unicode, URI Component, and more.",
				icons: [{
					src: "https://assets.retiehe.com/ysz/avatar.png",
					sizes: "720x720",
					type: "image/png",
					purpose: "any maskable"
				}]
			}
		})
	]
});
