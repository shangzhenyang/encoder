export function decodeCharCode(str: string) {
	const codes = str.trim().split(" ");
	let result = "";
	for (let i = 0; i < codes.length; i++) {
		result += String.fromCharCode(parseInt(codes[i]));
	}
	return result;
}

export function encodeCharCode(str: string) {
	let result = "";
	for (let i = 0; i < str.length; i++) {
		result += str.charCodeAt(i).toString() + " ";
	}
	return result.trim();
}
