import { userCardRequest } from "../types";

export default function createCardPreviewNode(card: userCardRequest) {
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
