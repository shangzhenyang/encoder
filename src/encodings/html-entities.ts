import { decode, encode } from "html-entities";

export function decodeHtmlEntities(str: string): string {
	return decode(str);
}

export function encodeHtmlEntities(str: string): string {
	return encode(str);
}

export function isHtmlEntitiesEncoded(str: string): boolean {
	return str.includes("&") && str.includes(";");
}
