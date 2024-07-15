export function decodeUnicode(unicode: string): string {
	return unicode.replace(/\\u?([\d\w]{4})/gi, (_match, group: string) => {
		return String.fromCharCode(parseInt(group, 16));
	});
}

export function encodeUnicode(str: string, separator = "\\"): string {
	let unicode = "";
	for (let i = 0; i < str.length; i++) {
		let charCode = str.charCodeAt(i).toString(16).toUpperCase();
		if (charCode.length < 4) {
			charCode = charCode.padStart(4, "0");
		}
		unicode += separator + "u" + charCode;
	}
	return unicode;
}
