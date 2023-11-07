import { ServerResponse, userCardRequest } from "../types";
import Template from "./template";
import { smallSample } from "../functions/sampleDeckList";

export default class View {
	app: HTMLDivElement;
	cardTextArea: HTMLTextAreaElement;
	cardDisplayDiv: HTMLDivElement;
	cardDisplayDivFetched: HTMLDivElement;
	fetchBtn: HTMLButtonElement;
	downloadZipBtn: HTMLButtonElement;
	template: Template;

	/**
	 * to-do: fix non-null assertions
	 */

	constructor(template: Template) {
		this.template = template;
		this.app = document.querySelector<HTMLDivElement>("#app")!;
		this.cardTextArea = document.querySelector<HTMLTextAreaElement>("#card-textarea")!;
		this.cardDisplayDiv = document.querySelector<HTMLDivElement>("#card-display-div")!;
		this.cardDisplayDivFetched = document.querySelector<HTMLDivElement>(
			"#card-display-div-fetched"
		)!;
		this.fetchBtn = document.querySelector<HTMLButtonElement>("#btn--fetch")!;
		this.downloadZipBtn = document.querySelector<HTMLButtonElement>("#btn--download-zip")!;

		this.cardTextArea.value = smallSample();
	}

	displayErrorMessage(message: string) {
		console.log(message);
	}

	setButtonVisibility(btnElement: HTMLButtonElement, visibility: "none" | "block" | "flex") {
		if (btnElement) {
			btnElement.style.display = visibility;
		}
	}

	renderParsedPreview(data: userCardRequest[]) {
		// clear the container for each render cycle to avoid multiple overlapping entries
		this.cardDisplayDiv.innerHTML = "";

		data.forEach((card) => {
			const childNode = this.template.createCardPreviewNode(card);
			this.cardDisplayDiv.appendChild(childNode);
		});

		this.setButtonVisibility(this.fetchBtn, "block");
	}

	renderFetchedCards(data: ServerResponse) {
		const fetchedCards = data.fetchedCards;
		this.cardDisplayDivFetched.innerHTML = "";

		fetchedCards.forEach((card) => {
			const childNode = this.template.createCard(card.data);
			this.cardDisplayDivFetched.appendChild(childNode);
		});

		this.setButtonVisibility(this.downloadZipBtn, "block");
	}

	bindCreateZipFile(handler: () => void) {
		this.downloadZipBtn.addEventListener("click", () => handler());
	}

	bindHandleFetchFromScryfall(handler: () => void) {
		this.fetchBtn.addEventListener("click", () => handler());
	}

	bindParseInputToUserRequestArray(handler: (content: string) => void) {
		this.cardTextArea.addEventListener("input", () => handler(this.cardTextArea.value));
	}
}
