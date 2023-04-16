export function decodeBase64(str: string) {
	return decodeURIComponent(escape(window.atob(str)));
}

export function encodeBase64(str: string) {
	try {
		return window.btoa(str);
	} catch {
		return window.btoa(unescape(encodeURIComponent(str)));
	}
}
