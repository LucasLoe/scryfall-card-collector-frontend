import { userCardRequest } from "../types";
import axios from "axios";
import { sleep } from "../functions/helpers";

type response = {
	success: boolean;
	query: string;
	amount: number;
	data: any;
};

export class ApiService {
	constructor() {}

	async fetchCards(cardRequestData: userCardRequest[]): Promise<any> {
		try {
			console.log("fetch initiated");

			const axiosResponses = await Promise.allSettled(
				cardRequestData.map((card, idx) => this.fetchData(card, idx))
			);

			const flattenedResponse = axiosResponses
				.filter((res) => res.status === "fulfilled")
				.map((res) => res.status === "fulfilled" && res.value) as response[];

			const fetchedCards = flattenedResponse
				.filter((res) => res.success)
				.map((res) => ({ cardName: res.query, data: res.data, amount: res.amount }));

			const rejectedCards = flattenedResponse
				.filter((res) => !res.success)
				.map((res) => ({ cardName: res.query, data: null, amount: res.amount }));

			return { fetchedCards: fetchedCards, rejectedCards: rejectedCards };
		} catch (error) {
			console.log(`Error while fetching. Error is: ${error}`);
		}
	}

	async fetchPrintedVersions(url: string): Promise<any> {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				console.log(`Network response was not ok. Error is: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.log(`Error while fetching from ${url}. Error is: ${error}`);
		}
	}

	async fetchData(card: userCardRequest, requestIndex: number) {
		const query = card.cardName;
		try {
			await sleep(80 * requestIndex); // delay needed for avoiding a scryfall ban according to the api docs
			const response = await axios.get(
				`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(query)}`,
				{
					headers: {
						Accept: "application/json;q=0.9,*/*;q=0.8",
					},
				}
			);
			return {
				success: true,
				query: query,
				amount: card.amount,
				data: response.data,
			};
		} catch (error) {
			return {
				success: false,
				query: query,
				amount: card.amount,
				data: undefined,
			};
		}
	}
}
