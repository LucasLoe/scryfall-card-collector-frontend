import { PrintedCardVersions, fetchedCardData, userCardRequest } from "../types";
import Template from "./template";
import Card from "./card";
import { sampleDeckList } from "../functions/sampleDeckList";

export default class View {
	app: HTMLDivElement;
	cardTextArea: HTMLTextAreaElement;
	cardDisplayDiv: HTMLDivElement;
	cardDisplayDivFetched: HTMLDivElement;
	fetchBtn: HTMLButtonElement;
	downloadZipBtn: HTMLButtonElement;
	downloadPdfBtn: HTMLButtonElement;
	template: Template;

	/**
	 * to-do: fix non-null assertions
	 */

	constructor() {
		this.template = new Template();
		this.app = document.querySelector<HTMLDivElement>("#app")!;
		this.cardTextArea = document.querySelector<HTMLTextAreaElement>("#card-textarea")!;
		this.cardDisplayDiv = document.querySelector<HTMLDivElement>("#card-display-div")!;
		this.cardDisplayDivFetched = document.querySelector<HTMLDivElement>(
			"#card-display-div-fetched"
		)!;
		this.fetchBtn = document.querySelector<HTMLButtonElement>("#btn--fetch")!;
		this.downloadZipBtn = document.querySelector<HTMLButtonElement>("#btn--download-zip")!;
		this.downloadPdfBtn = document.querySelector<HTMLButtonElement>("#btn--download-pdf")!;

		this.cardTextArea.value = sampleDeckList();
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
			const childNode = this.template.createParsedItem(card);
			this.cardDisplayDiv.appendChild(childNode);
		});

		this.setButtonVisibility(this.fetchBtn, "block");
	}

	renderFetchedCards(
		fetchedCards: fetchedCardData[],
		onInitialClick: (
			data: fetchedCardData,
			callbackOnSuccess?: (data: PrintedCardVersions) => void
		) => Promise<PrintedCardVersions | undefined>,
		onOptionSelect: (oldId: string, data: fetchedCardData) => void
	) {
		this.cardDisplayDivFetched.innerHTML = "";

		fetchedCards.forEach((cardData) => {
			const card = new Card(cardData, onInitialClick, onOptionSelect);
			this.cardDisplayDivFetched.appendChild(card.element);
		});

		this.setButtonVisibility(this.downloadZipBtn, "block");
		this.setButtonVisibility(this.downloadPdfBtn, "block");
	}

	bindCreateZipFile(handler: () => void) {
		this.downloadZipBtn.addEventListener("click", () => handler());
	}

	bindCreatePdfFile(handler: () => void) {
		this.downloadPdfBtn.addEventListener("click", () => handler());
	}

	bindHandleFetchFromScryfall(handler: () => void) {
		this.fetchBtn.addEventListener("click", () => handler());
	}

	bindParseInputToUserRequestArray(handler: (content: string) => void) {
		this.cardTextArea.addEventListener("input", () => handler(this.cardTextArea.value));
	}

	bindVersionSelectHandler(handler: (content: {}) => void, node: HTMLSelectElement) {
		node.addEventListener("click", () => console.log(handler));
	}
}
