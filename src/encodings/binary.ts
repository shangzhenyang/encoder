export function decodeBinary(str: string): string {
	const binaries = str.trim().split(" ");
	let result = "";
	for (let i = 0; i < binaries.length; i++) {
		result += String.fromCharCode(parseInt(binaries[i], 2));
	}
	return result;
}

export function encodeBinary(str: string): string {
	const num = parseInt(str);
	let binary = "";
	if (!isNaN(num)) {
		binary = num.toString(2);
	} else {
		for (let i = 0; i < str.length; i++) {
			binary += str.charCodeAt(i).toString(2) + " ";
		}
	}
	return binary.trim();
}
