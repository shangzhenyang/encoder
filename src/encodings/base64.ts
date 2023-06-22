export function decodeBase64(str: string): string {
	return decodeURIComponent(escape(window.atob(str)));
}

export function encodeBase64(str: string): string {
	try {
		return window.btoa(str);
	} catch {
		return window.btoa(unescape(encodeURIComponent(str)));
	}
}
