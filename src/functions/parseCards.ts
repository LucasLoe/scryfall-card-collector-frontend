import { userCardRequest } from "../types";

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
