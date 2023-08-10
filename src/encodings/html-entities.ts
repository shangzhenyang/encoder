import {
	decode as decodeHtmlEntities,
	encode as encodeHtmlEntities,
} from "html-entities";

function isHtmlEntitiesEncoded(str: string): boolean {
	return str.includes("&") && str.includes(";");
}

export { decodeHtmlEntities, encodeHtmlEntities, isHtmlEntitiesEncoded };
