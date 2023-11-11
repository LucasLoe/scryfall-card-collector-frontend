/**
 * @vitest-environment jsdom
 */

import { beforeEach, describe, it, expect } from "vitest";
import View from "../classes/view";
import { smallSample } from "../functions/sampleDeckList";

describe("View", () => {
	let view: View;

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
		view = new View();
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

	/**
	 * to-do: test event listeners
	 */
});
