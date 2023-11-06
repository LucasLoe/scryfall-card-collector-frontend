import { fetchedCardData } from "../types";

export default function createCard(fetchedCard: fetchedCardData) {
	let image_uri = "";

	if ("image_uris" in fetchedCard && fetchedCard.image_uris) {
		image_uri = fetchedCard.image_uris.normal;
	} else if ("card_faces" in fetchedCard && fetchedCard.card_faces) {
		image_uri = fetchedCard.card_faces[0].image_uris.normal;
	} else {
		image_uri = "";
	}

	const cardNode = document.createElement("div");
	const cardImage = document.createElement("img");
	const cardTitle = document.createElement("p");

	cardNode.classList.add("card__container");
	cardImage.classList.add("card__image");
	cardTitle.classList.add("card__title");

	cardTitle.textContent = fetchedCard.name;
	cardImage.src = image_uri;

	cardNode.appendChild(cardImage);
	cardNode.appendChild(cardTitle);

	return cardNode;
}
