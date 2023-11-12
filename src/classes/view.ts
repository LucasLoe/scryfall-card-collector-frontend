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
	downloadPdfBtn: HTMLButtonElement;
	pdfProgressNode: HTMLParagraphElement;
	template: Template;

	/**
	 * to-do: fix non-null assertions
	 */

	constructor() {
		this.template = new Template();
		this.app = document.querySelector("#app")!;
		this.cardTextArea = document.querySelector("#card-textarea")!;
		this.cardDisplayDiv = document.querySelector("#card-display-div")!;
		this.cardDisplayDivFetched = document.querySelector("#card-display-div-fetched")!;
		this.fetchBtn = document.querySelector("#btn--fetch")!;
		this.downloadPdfBtn = document.querySelector("#btn--download-pdf")!;
		this.pdfProgressNode = document.querySelector("#p--status-download-pdf")!;
		this.cardTextArea.placeholder = sampleDeckList();
	}

	displayErrorMessage(message: string) {
		console.log(message);
	}

	setElementVisibility(element: HTMLElement, visibility: "none" | "block" | "flex") {
		if (element) {
			element.style.display = visibility;
		}
	}

	renderParsedPreview(data: userCardRequest[]) {
		// clear the container for each render cycle to avoid multiple overlapping entries
		this.cardDisplayDiv.innerHTML = "";
		data.forEach((card) => {
			const childNode = this.template.createParsedItem(card);
			this.cardDisplayDiv.appendChild(childNode);
		});

		this.setElementVisibility(this.fetchBtn, "block");
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

		this.setElementVisibility(this.downloadPdfBtn, "block");
	}

	renderPdfProgress(fraction: number) {
		const progressInPercent = Math.ceil(fraction * 100);
		this.pdfProgressNode.innerText = `Current progress: ${progressInPercent} %`;
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
}
