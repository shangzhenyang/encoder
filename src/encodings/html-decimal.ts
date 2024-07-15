export function decodeHtmlDecimal(str: string): string {
	return str.replace(/&#(\d+);/g, (_, code: string) => {
		return String.fromCharCode(parseInt(code, 10));
	});
}

export function encodeHtmlDecimal(str: string): string {
	return str
		.split("")
		.map((char) => {
			return `&#${char.charCodeAt(0)};`;
		})
		.join("");
}

export function isHtmlDecimalEncoded(str: string): boolean {
	return str.includes("&#") && str.includes(";");
}
