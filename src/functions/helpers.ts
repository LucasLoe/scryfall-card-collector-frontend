import { fetchedCardData, userCardRequest } from "../types";

export default function parseCards(content: string) {
	// test for the format number-whitespace-[string/whitespace]
	function isLegalLineFormat(str: string) {
		const regex = /^\d+ [^\n\r]+$/gm;
		return regex.test(str);
	}

	const cardArray: string[] = content
		.split("\n")
		.filter((line) => line != "")
		.map((line) => line.trim());

	const matchingLines = cardArray.filter((line) => isLegalLineFormat(line));
	const nonMatchingLines = cardArray.filter((line) => !isLegalLineFormat(line));

	const userCardRequestArray: userCardRequest[] = matchingLines.map((line) => {
		const [amount, cardName] = line.split(/\s(.+)/, 2); //split after first whitespace
		return {
			cardName: cardName,
			amount: parseInt(amount),
		};
	});

	return {
		parsedLinesAsObjects: userCardRequestArray,
		failedLines: nonMatchingLines,
	};
}

export function getImageUrlsFromServerResponse(fetchedCardData: fetchedCardData[]) {
	const imageUrls = fetchedCardData.map((card) => {
		if ("image_uris" in card && card.image_uris) {
			return card.image_uris.normal;
		} else if ("card_faces" in card && card.card_faces) {
			return card.card_faces[0].image_uris.normal;
		} else {
			return "";
		}
	});

	return imageUrls;
}
export function getPngUrlsFromServerResponse(fetchedCardData: fetchedCardData[]) {
	const pngUrls = fetchedCardData.map((card) => {
		if ("image_uris" in card && card.image_uris) {
			return card.image_uris.png;
		} else if ("card_faces" in card && card.card_faces) {
			return card.card_faces[0].image_uris.png;
		} else {
			return "";
		}
	});
	return pngUrls;
}

export function getDisplayName(card: fetchedCardData) {
	const setName = card.set;
	const setNumber = card.collector_number;

	return `${setName} (${setNumber})`;
}

export function sleep(timeInMilliseconds: number) {
	return new Promise((resolve) => setTimeout(resolve, timeInMilliseconds));
}
