const codes = "0123456789a ";
const coreValues = [
	"富强", "民主", "文明", "和谐",
	"自由", "平等", "公正", "法治",
	"爱国", "敬业", "诚信", "友善"
];

export function decodeCoreValues(str: string) {
	if (!str) {
		return "";
	}

	// replace core values with 11-based char codes
	for (let i = 0; i < coreValues.length; i++) {
		str = str.replace(new RegExp(coreValues[i] + "\\s?", "g"), codes[i]);
	}

	// convert 11-based char codes to the original string
	const base = codes.length - 1;
	const values = str.trim().split(" ");
	let result = "";
	for (let i = 0; i < values.length; i++) {
		result += String.fromCharCode(parseInt(values[i], base));
	}
	return result;
}

export function encodeCoreValues(str: string) {
	try {
		const base = codes.length - 1;
		let encoded = "";
		for (let i = 0; i < str.length; i++) {
			let charCode = str.charCodeAt(i).toString(base);
			for (let j = 0; j < base; j++) {
				charCode = charCode.replace(
					new RegExp(codes[j], "g"),
					coreValues[j] + " "
				);
			}
			encoded += charCode;
			if (str.length <= 1 || i < str.length - 1) {
				encoded += coreValues[coreValues.length - 1] + " ";
			}
		}
		return encoded.trim();
	} catch (err) {
		console.error(err);
		return "";
	}
}

export function isCoreValuesEncoded(str: string) {
	str = str.replaceAll(" ", "");
	if (!str || str.length % 2 !== 0) {
		return false;
	}
	const maxLoop = Math.min(str.length, 10);
	for (let i = 0; i < maxLoop; i += 2) {
		const word = str.substring(i, i + 2);
		if (!coreValues.includes(word)) {
			return false;
		}
	}
	return true;
}
