// store.test.js
import Store from "../classes/store";
import initUserData from "../functions/initUserData";
import { describe, beforeEach, it, expect, vi } from "vitest";
import { apiUrls, fetchedCardData } from "../types";

describe("Store", () => {
	let store: Store;

	beforeEach(() => {
		store = new Store(apiUrls.localhost, initUserData());
	});

	describe("constructor", () => {
		it("should initialize userData and apiService", () => {
			expect(store.userData).toBeDefined();
			expect(store._apiService).toBeDefined();
			expect(store._apiUrl).toEqual("http://localhost:8000");
		});
	});

	describe("userData getter", () => {
		it("should return the userData", () => {
			const userData = store.userData;
			expect(userData).toEqual(initUserData());
		});
	});

	describe("downloadUrls getter", () => {
		it("should return an array of downloadUrls", () => {
			const downloadUrls = store.downloadUrls;
			expect(Array.isArray(downloadUrls)).toBe(true);
		});
	});

	describe("userData setter", () => {
		it("should set the userData", () => {
			const newUserData = initUserData();
			store.userData = newUserData;
			expect(store.userData).toEqual(newUserData);
		});
	});

	describe("isUserRequestArrayNotEmpty", () => {
		it("should return true when userRequestCardArray is not empty", () => {
			store.userData.userRequestCardArray = [
				{ cardName: "test-1", amount: 1 },
				{ cardName: "test-2", amount: 2 },
			];
			const result = store.isUserRequestArrayNotEmpty();
			expect(result).toBe(true);
		});

		it("should return false when userRequestCardArray is empty", () => {
			store.userData.userRequestCardArray = [];
			const result = store.isUserRequestArrayNotEmpty();
			expect(result).toBe(false);
		});
	});

	describe("fetchCards", () => {
		it("should fetch cards and update userData.fetchedData", async () => {
			// Create a mock ApiService that returns a sample ServerResponse
			store._apiService.fetchCards = vi.fn(() => {
				return Promise.resolve({
					fetchedCards: [
						{
							cardName: "card1",
							data: { image_uris: { normal: "image-url", png: "png-url" } } as fetchedCardData,
						},
					],
					rejectedCards: [{ cardname: "rejected", data: null }],
				});
			});

			const callback = vi.fn();

			await store.fetchCards(store.userData, callback);

			expect(store.userData.fetchedData.imageUrls).toBeDefined();
			expect(store.userData.fetchedData.pngUrls).toBeDefined();
			expect(callback).toHaveBeenCalled();
		});

		it("should handle errors and log them", async () => {
			// Create a mock ApiService that throws an error
			store._apiService.fetchCards = vi.fn(() => {
				return Promise.reject("Error occurred");
			});

			const consoleError = console.error;
			console.error = vi.fn();

			await store.fetchCards(store.userData);

			expect(console.error).toHaveBeenCalledWith("Error: Error occurred");

			console.error = consoleError;
		});
	});
});
