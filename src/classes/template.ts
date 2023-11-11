import { getDisplayName, getImageUrlsFromServerResponse } from "../functions/helpers";
import { userCardRequest } from "../types";
import { fetchedCardData } from "../types";

export default class Template {
	createCard(card: fetchedCardData) {
		let image_uri = getImageUrlsFromServerResponse([card])[0];

		const cardNode = document.createElement("div");
		const cardImage = document.createElement("img");
		const cardTitle = document.createElement("p");
		const cardSelectMenu = this.createSelectMenu(card);

		cardNode.classList.add("card__container");
		cardImage.classList.add("card__image");
		cardTitle.classList.add("card__title");
		cardSelectMenu.classList.add("card__select");

		cardTitle.textContent = card.name;
		cardImage.src = image_uri;

		cardNode.appendChild(cardImage);
		cardNode.appendChild(cardTitle);
		cardNode.appendChild(cardSelectMenu);

		return cardNode;
	}

	createParsedItem(card: userCardRequest) {
		const previewCardNode = document.createElement("div");
		const previewCardName = document.createElement("p");
		const previewCardAmount = document.createElement("p");

		previewCardNode.classList.add("card-parsed__container");
		previewCardName.classList.add("card-parsed__title");
		previewCardAmount.classList.add("card-parsed__amount");

		previewCardName.textContent = card.cardName.toString();
		previewCardAmount.textContent = card.amount.toString();

		previewCardNode.appendChild(previewCardAmount);
		previewCardNode.appendChild(previewCardName);

		return previewCardNode;
	}

	createSelectMenu(defaultCard: fetchedCardData) {
		const cardSelectMenu = document.createElement("select");
		const defaultOption = this.createCardSelectOption(defaultCard);
		cardSelectMenu.appendChild(defaultOption);

		return cardSelectMenu;
	}

	createCardSelectOption(card: fetchedCardData) {
		const option = document.createElement("option");
		option.value = card.id;
		option.text = getDisplayName(card);
		return option;
	}
}
