import { userCardRequest } from "../types";
export default async function fetchFromRenderCom(cardRequestData: userCardRequest[]) {
	console.log("fetch initiated");
	const cardNames = cardRequestData.map((card) => card.cardName).join(",");

	const localHostUrl = new URL("https://scryfall-api-node-js.onrender.com/api/search-array");
	localHostUrl.searchParams.set("cardNames", cardNames);

	try {
		const response = await fetch(localHostUrl);

		if (!response.ok) {
			throw new Error(`Network response was not ok. Error is: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(`Error while fetching from ${localHostUrl}. Error is: ${error}`);
	}
}
