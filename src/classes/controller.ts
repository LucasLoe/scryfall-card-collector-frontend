import View from "./view";
import Store from "./store";
import { ServerResponse } from "../types";
import parseCards from "../functions/helpers";
import ZipService from "./zipService";

export default class Controller {
	private view: View;
	private store: Store;
	private zipService: ZipService;

	constructor(view: View, store: Store) {
		this.view = view;
		this.store = store;
		this.zipService = new ZipService();

		this.view.bindParseInputToUserRequestArray(this.parseInputToUserRequestArray.bind(this));
		this.view.bindHandleFetchFromScryfall(this.handleFetchDataFromScryfall.bind(this));
		this.view.bindCreateZipFile(this.createAndDownloadZipFile.bind(this));

		this.parseInputToUserRequestArray(this.view.cardTextArea.value);
	}

	init() {
		console.log("app initialized");
	}

	handleFetchDataFromScryfall() {
		console.log("called");
		if (this.store.isUserRequestArrayNotEmpty()) {
			this.store.fetchCards(this.store.userData, (data: ServerResponse) =>
				this.view.renderFetchedCards(data)
			);
		}
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
		const fileName = `mtg_card_download_${new Date().toISOString()}`;
		this.zipService.downloadZip(fileName, this.store.downloadUrls);
	}
}
