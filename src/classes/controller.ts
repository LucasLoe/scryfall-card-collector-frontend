import View from "./view";
import Store from "./store";
import { ServerResponse, fetchedCardData } from "../types";
import parseCards from "../functions/helpers";
import ZipService from "./zipService";
import { PdfService } from "./pdfService";

export default class Controller {
	view: View;
	store: Store;
	zipService: ZipService;
	pdfService: PdfService;

	constructor(view: View, store: Store) {
		this.view = view;
		this.store = store;
		this.zipService = new ZipService();
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
		this.view.bindCreateZipFile(this.createAndDownloadZipFile.bind(this));
		this.view.bindCreatePdfFile(this.createAndDownloadPdfFile.bind(this));

		this.handleFetchDataFromScryfall = this.handleFetchDataFromScryfall.bind(this);
		this.onOptionSelect = this.onOptionSelect.bind(this);
	}

	handleFetchDataFromScryfall() {
		if (this.store.isUserRequestArrayNotEmpty()) {
			this.store.fetchCards(this.store.userData, (data: ServerResponse) => {
				const fetchedCardsArray = data.fetchedCards.map((elem) => elem.data);
				this.view.renderFetchedCards(
					fetchedCardsArray,
					this.store.fetchPrintedVersionsOfCard,
					this.onOptionSelect
				);
			});
		}
	}

	onOptionSelect(oldId: string, card: fetchedCardData) {
		this.store.updatePrintedCardsById(oldId, card);
		console.log(`refreshed userdata to: ${JSON.stringify(this.store.userData.printData[0])}`);
	}

	parseInputToUserRequestArray(content: string) {
		const { parsedLinesAsObjects, failedLines } = parseCards(content);
		this.store.userData.failedRequestStrings = failedLines;
		this.store.userData.userRequestCardArray = parsedLinesAsObjects;

		if (this.store.isUserRequestArrayNotEmpty()) {
			this.view.renderParsedPreview(this.store.userData.userRequestCardArray);
		}
	}

	createAndDownloadZipFile() {
		const filename = `mtg_card_download_${new Date().toISOString()}`;
		const imageUrls = this.store.downloadUrls.map((elem) => elem.pngUrl);
		this.zipService.downloadZip(filename, imageUrls);
	}

	createAndDownloadPdfFile() {
		console.log("pdf process started");
		const filename = `mtg_card_download_${new Date().toISOString()}`;
		this.pdfService.downloadPdf(filename, this.store.downloadUrls);
	}
}
