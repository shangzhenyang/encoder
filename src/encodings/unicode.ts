function addZero(num: string, length: number): string {
	return (Array(length).join("0") + (num || "0")).slice(-length);
}

export function decodeUnicode(unicode: string): string {
	return unicode.replace(/\\u?([\d\w]{4})/gi, (_match, group) => {
		return String.fromCharCode(parseInt(group, 16));
	});
}

export function encodeUnicode(str: string, separator = "\\"): string {
	let unicode = "";
	for (let i = 0; i < str.length; i++) {
		let charCode = str.charCodeAt(i).toString(16).toUpperCase();
		if (charCode.length < 4) {
			charCode = addZero(charCode, 4);
		}
		unicode += separator + "u" + charCode;
	}
	return unicode;
}
