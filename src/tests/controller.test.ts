/**
 * @vitest-environment jsdom
 */

import Store from "../classes/store";
import View from "../classes/view";
import initUserData from "../functions/initUserData";
import { describe, beforeEach, it, expect, vi } from "vitest";
import Template from "../classes/template";
import { apiUrls } from "../types";
import Controller from "../classes/controller";

describe("Controller", () => {
	let template: Template;
	let view: View;
	let store: Store;
	let controller: Controller;

	beforeEach(() => {
		template = new Template();
		view = new View(template);
		store = new Store(apiUrls.localhost, initUserData());
		controller = new Controller(view, store);
	});

	describe("constructor", () => {
		it("should initialize with a view and store", () => {
			expect(controller.view).toBeDefined();
			expect(controller.store).toBeDefined();
			expect(controller.zipService).toBeDefined();
		});
	});
});
