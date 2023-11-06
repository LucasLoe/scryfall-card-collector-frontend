import createCard from "../components/createCard";
import { ServerResponse } from "../types";

export default function renderFetchedCards(parentNode: HTMLDivElement, data: ServerResponse) {
	// needed to clear the container for each render cycle
	const fetchedCards = data.fetchedCards;
	parentNode.innerHTML = "";

	fetchedCards.forEach((card) => {
		const childNode = createCard(card.data);
		parentNode.appendChild(childNode);
	});
}
