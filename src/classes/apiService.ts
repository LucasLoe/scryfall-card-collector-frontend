import { userCardRequest, apiUrls, routes } from "../types";

export class ApiService {
	private baseUrl: apiUrls;
	private route: routes;

	constructor(baseUrl: apiUrls, route: routes) {
		this.baseUrl = baseUrl;
		this.route = route;
	}

	_createApiUrl(searchparams: Map<string, string>) {
		const apiUrl = new URL(`${this.baseUrl}${this.route}`);

		for (let [key, values] of searchparams) {
			apiUrl.searchParams.set(key, values);
		}

		return apiUrl;
	}

	async fetchCards(cardRequestData: userCardRequest[]): Promise<any> {
		const cardNames = cardRequestData.map((card) => card.cardName).join(",");

		const params = new Map<string, string>();
		params.set("cardNames", cardNames);

		const apiUrl = this._createApiUrl(params);

		try {
			const response = await fetch(apiUrl.toString());

			if (!response.ok) {
				throw new Error(`Network response was not ok. Error is: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.log(`Error while fetching from ${apiUrl}. Error is: ${error}`);
		}
	}
}
