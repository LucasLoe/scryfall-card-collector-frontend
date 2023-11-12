import View from "./view";
import Store from "./store";
import { ServerResponse, fetchedCardData } from "../types";
import parseCards from "../functions/helpers";
import { PdfService } from "./pdfService";

export default class Controller {
	view: View;
	store: Store;
	pdfService: PdfService;

	constructor(view: View, store: Store) {
		this.view = view;
		this.store = store;
		this.pdfService = new PdfService();

		this.bindEvents();
		this.parseInputToUserRequestArray(this.view.cardTextArea.value);
	}

	init() {
		console.log("app initialized");
	}

	bindEvents() {
		this.view.bindParseInputToUserRequestArray(this.parseInputToUserRequestArray.bind(this));
		this.view.bindHandleFetchFromScryfall(this.handleFetchDataFromScryfall.bind(this));
		this.view.bindCreatePdfFile(this.createAndDownloadPdfFile.bind(this));

		this.handleFetchDataFromScryfall = this.handleFetchDataFromScryfall.bind(this);
		this.setPdfProgress = this.setPdfProgress.bind(this);
		this.onOptionSelect = this.onOptionSelect.bind(this);
	}

	handleFetchDataFromScryfall() {
		if (this.store.isUserRequestArrayNotEmpty()) {
			this.view.setElementVisibility(this.view.fetchBtn, "none");
			this.view.setElementVisibility(this.view.fetchMessage, "block");
			this.store.fetchCards(this.store.userData, (data: ServerResponse) => {
				const fetchedCardsArray = data.fetchedCards.map((elem) => elem.data);
				this.view.renderFetchedCards(
					fetchedCardsArray,
					this.store.fetchPrintedVersionsOfCard,
					this.onOptionSelect
				);
				this.view.setElementVisibility(this.view.fetchBtn, "block");
				this.view.setElementVisibility(this.view.fetchMessage, "none");
			});
		}
	}

	onOptionSelect(oldId: string, card: fetchedCardData) {
		this.store.updatePrintedCardsById(oldId, card);
	}

	parseInputToUserRequestArray(content: string) {
		const { parsedLinesAsObjects, failedLines } = parseCards(content);
		this.store.userData.failedRequestStrings = failedLines;
		this.store.userData.userRequestCardArray = parsedLinesAsObjects;

		if (this.store.isUserRequestArrayNotEmpty()) {
			this.view.renderParsedPreview(this.store.userData.userRequestCardArray);
		}
	}

	createAndDownloadPdfFile() {
		const filename = `mtg_card_download_${new Date().toISOString()}`;
		const downloadData = this.store.flattenedDownloadDataForPdf();
		this.pdfService.downloadPdf(filename, downloadData, this.setPdfProgress);
	}

	setPdfProgress(fraction: number) {
		this.view.renderPdfProgress(fraction);
		this.view.setElementVisibility(this.view.pdfProgressNode, "block");
	}
}
