import { getImageUrlsFromServerResponse } from "../functions/helpers";
import { PrintedCardVersions, fetchedCardData } from "../types";
import Template from "./template";

export default class Card {
	private card;
	private cardId;
	private template;
	private initialPopulateFunction;
	private onOptionSelect;
	private isPopulated: boolean;
	private printedCardVersions: PrintedCardVersions | undefined;
	private _element: HTMLElement;

	constructor(
		data: fetchedCardData,
		initialPopulateFunction: (card: fetchedCardData) => Promise<PrintedCardVersions | undefined>,
		onOptionSelect: (oldId: string, card: fetchedCardData) => void
	) {
		this.card = data;
		this.cardId = data.id;
		this.printedCardVersions = undefined;
		this.initialPopulateFunction = initialPopulateFunction;
		this.template = new Template();
		this.isPopulated = false;
		this.onOptionSelect = onOptionSelect;
		this._element = this._createCardView();
		this._bindOnOptionsSelect();
	}

	_createCardView() {
		const node = this.template.createCard(this.card);
		node.addEventListener("click", () => this._populateSelectMenu());

		return node;
	}

	async _populateSelectMenu() {
		if (this.isPopulated) {
			return;
		} else {
			const printedCardVersions = await this.initialPopulateFunction(this.card);
			if (printedCardVersions) {
				this.printedCardVersions = printedCardVersions;
				this.printedCardVersions.data.forEach((elem) => {
					this._createSelectOptions(elem);
				});
				this.isPopulated = true;
			}
		}
	}

	_bindOnOptionsSelect() {
		const node = this._element.querySelector("select")!;
		node.addEventListener("change", () => {
			const version = this._findCardVersionById(node.value);
			if (version) {
				const oldId = this.cardId;
				const newId = version.id;
				const newImageUrl = getImageUrlsFromServerResponse([version])[0];
				this.onOptionSelect(oldId, version);
				this._updateCardId(newId);
				this._rerenderCardImage(newImageUrl);
			}
		});
	}

	_findCardVersionById(id: string) {
		if (this.printedCardVersions) {
			return this.printedCardVersions.data.filter((elem) => elem.id === id)[0];
		}
	}

	_createSelectOptions(card: fetchedCardData) {
		const selectOption = this.template.createCardSelectOption(card);
		this._element.querySelector("select")?.append(selectOption);
	}

	get element() {
		return this._element;
	}

	_rerenderCardImage(imageUrl: string) {
		const cardImageNode = this._element.querySelector("img");
		if (cardImageNode) {
			cardImageNode.src = imageUrl;
		}
	}

	_updateCardId(id: string) {
		this.cardId = id;
	}
}
