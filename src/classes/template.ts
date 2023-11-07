import { getImageUrlsFromServerResponse } from "../functions/helpers";
import { userCardRequest } from "../types";
import { fetchedCardData } from "../types";

export default class Template {
	createCardPreviewNode(card: userCardRequest) {
		const previewCardNode = document.createElement("div");
		const previewCardName = document.createElement("p");
		const previewCardAmount = document.createElement("p");

		previewCardNode.classList.add("card-preview__container");
		previewCardName.classList.add("card-preview__title");
		previewCardAmount.classList.add("card-preview__amount");

		previewCardName.textContent = card.cardName.toString();
		previewCardAmount.textContent = card.amount.toString();

		previewCardNode.appendChild(previewCardName);
		previewCardNode.appendChild(previewCardAmount);

		return previewCardNode;
	}

	createCard(card: fetchedCardData) {
		let image_uri = getImageUrlsFromServerResponse([card])[0];

		const cardNode = document.createElement("div");
		const cardImage = document.createElement("img");
		const cardTitle = document.createElement("p");

		cardNode.classList.add("card__container");
		cardImage.classList.add("card__image");
		cardTitle.classList.add("card__title");

		cardTitle.textContent = card.name;
		cardImage.src = image_uri;

		cardNode.appendChild(cardImage);
		cardNode.appendChild(cardTitle);

		return cardNode;
	}
}
