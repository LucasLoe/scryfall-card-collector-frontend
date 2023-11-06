import fetchFromRenderCom from "../api/fetchFromRenderCom";
import { ServerResponse, UserDataProps } from "../types";
import renderFetchedCards from "./renderFetchedCards";

export default async function fetchData(
	targetNode: HTMLDivElement,
	userData: UserDataProps,
	callbackOnSuccess?: () => void
) {
	try {
		const data: ServerResponse = await fetchFromRenderCom(userData.userRequestCardArray);

		if (data) {
			data.fetchedCards.forEach((card) => {
				console.log(card.data.name);
				console.log(card.data);
			});
			const imageUrls = data.fetchedCards.map((card) => {
				if ("image_uris" in card.data && card.data.image_uris) {
					return card.data.image_uris.normal;
				} else if ("card_faces" in card.data && card.data.card_faces) {
					return card.data.card_faces[0].image_uris.normal;
				} else {
					return "";
				}
			});

			const pngUrls = data.fetchedCards.map((card) => {
				if ("image_uris" in card.data && card.data.image_uris) {
					return card.data.image_uris.png;
				} else if ("card_faces" in card.data && card.data.card_faces) {
					return card.data.card_faces[0].image_uris.png;
				} else {
					return "";
				}
			});

			renderFetchedCards(targetNode, data);
			userData.fetchedData = {
				fetchResponse: data,
				imageUrls: imageUrls,
				pngUrls: pngUrls,
			};

			if (callbackOnSuccess) {
				callbackOnSuccess();
			}
		}
	} catch (error) {
		console.error(`Error: ${error}`);
	}
}
