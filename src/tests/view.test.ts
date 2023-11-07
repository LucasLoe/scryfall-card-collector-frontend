/**
 * @vitest-environment jsdom
 */

import { beforeEach, describe, it, expect } from "vitest";
import View from "../classes/view";
import Template from "../classes/template";
import { smallSample } from "../functions/sampleDeckList";
import { ServerResponse, fetchedCardData } from "../types";

describe("View", () => {
	let view: View;
	let template: Template;

	beforeEach(() => {
		document.body.innerHTML = `
		<div id="app">
			<textarea id="card-textarea" class=""></textarea>
			<button id="btn--fetch" class="button-30">Fetch from Scryfall</button>
			<div id="card-display-div"></div>
			<div id="card-display-div-fetched"></div>
			<button id="btn--download-zip" class="button-30">Download ZIP file</button>
		</div>
        `;
		template = new Template();
		view = new View(template);
	});

	it("should initialize with the correct DOM elements", () => {
		expect(view.app).not.toBeNull();
		expect(view.cardDisplayDiv).not.toBeNull();
		expect(view.cardDisplayDivFetched).not.toBeNull();
		expect(view.cardTextArea).not.toBeNull();
		expect(view.fetchBtn).not.toBeNull();
		expect(view.downloadZipBtn).not.toBeNull();
		// only in prototyping stage
		expect(view.cardTextArea.value).toBe(smallSample());
	});

	it("<< display message >> method is defined", () => {
		expect(view.displayErrorMessage).toBeDefined();
	});

	it("setButtonVisibility", () => {
		const newBtn = document.createElement("button");
		view.setButtonVisibility(newBtn, "none");
		expect(newBtn.style.display).toBe("none");
		view.setButtonVisibility(newBtn, "block");
		expect(newBtn.style.display).toBe("block");
		view.setButtonVisibility(newBtn, "flex");
		expect(newBtn.style.display).toBe("flex");
	});

	it("render fetched cards to div", () => {
		const data: ServerResponse = {
			fetchedCards: [
				{
					cardName: "card1",
					data: { image_uris: { normal: "image-url", png: "png-url" } } as fetchedCardData,
				},
			],
			rejectedCard: [{ cardName: "rejected", data: null }],
		};

		view.renderFetchedCards(data);

		expect(view.downloadZipBtn.style.display).toBe("block");
		expect(view.cardDisplayDivFetched.children.length).toBe(1);
	});

	/**
	 * to-do: test event listeners
	 */
});
