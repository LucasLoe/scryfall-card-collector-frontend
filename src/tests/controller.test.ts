/**
 * @vitest-environment jsdom
 */

import Store from "../classes/store";
import View from "../classes/view";
import { describe, beforeEach, it, expect } from "vitest";
import Controller from "../classes/controller";

describe("Controller", () => {
	let view: View;
	let store: Store;
	let controller: Controller;

	beforeEach(() => {
		view = new View();
		controller = new Controller(view, store);
	});

	describe("constructor", () => {
		it("should initialize with a view and store", () => {
			expect(controller.view).toBeDefined();
			expect(controller.store).toBeDefined();
		});
	});
});
