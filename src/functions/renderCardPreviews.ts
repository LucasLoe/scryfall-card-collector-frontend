import createCardPreviewNode from "../components/createCardPreviewNode";
import { userCardRequest } from "../types";

export default function renderCardPreviews(
	parentNode: HTMLDivElement,
	cardData: userCardRequest[]
) {
	// needed to clear the container for each render cycle
	parentNode.innerHTML = "";

	cardData.forEach((card) => {
		const childNode = createCardPreviewNode(card);
		parentNode.appendChild(childNode);
	});
}
