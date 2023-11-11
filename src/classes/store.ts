import { getImageUrlsFromServerResponse, getPngUrlsFromServerResponse } from "../functions/helpers";
import initUserData from "../functions/initUserData";
import { UserDataProps, ServerResponse, fetchedCardData, PrintedCardVersions } from "../types";
import { ApiService } from "./apiService";

export default class Store {
	private _userData: UserDataProps;
	_apiService: ApiService;

	constructor(userData?: UserDataProps) {
		console.log(userData);
		this._userData = userData ? userData : initUserData();
		this._apiService = new ApiService();
		this.fetchPrintedVersionsOfCard = this.fetchPrintedVersionsOfCard.bind(this);
	}

	public get userData(): UserDataProps {
		return this._userData;
	}

	public get downloadUrls(): { pngUrl: string; amount: number }[] {
		const downloads = this._userData.printData.map((entry) => ({
			pngUrl: getPngUrlsFromServerResponse([entry.data])[0],
			amount: entry.amount,
		}));
		return downloads;
	}

	public set userData(data: UserDataProps) {
		this._userData = data;
	}

	updatePrintedCardsById(oldId: string, newCard: fetchedCardData) {
		const index = this._userData.printData
			.map((entry) => entry.data)
			.findIndex((item) => item.id === oldId);

		if (index != -1) {
			this._userData.printData[index].data = newCard;
		}
	}

	isUserRequestArrayNotEmpty() {
		return this.userData.userRequestCardArray.length > 0;
	}

	/* render the data */
	async fetchCards(userData: UserDataProps, callbackOnSuccess?: (data: ServerResponse) => void) {
		try {
			const data: ServerResponse = await this._apiService.fetchCards(userData.userRequestCardArray);

			const cardDataArray = data.fetchedCards.map((c) => c.data);

			if (data) {
				this._userData.fetchedData = {
					fetchResponse: data,
					imageUrls: getImageUrlsFromServerResponse(cardDataArray),
					pngUrls: getPngUrlsFromServerResponse(cardDataArray),
				};
				this._userData.printData = data.fetchedCards;

				if (callbackOnSuccess && data) {
					callbackOnSuccess(data);
				}
			}
		} catch (error) {
			console.error(`Error: ${error}`);
		}
	}

	async fetchPrintedVersionsOfCard(
		card: fetchedCardData,
		callbackOnSuccess?: (paginationData: PrintedCardVersions) => void
	) {
		try {
			console.log(card.prints_search_uri);
			const paginationData: PrintedCardVersions = await this._apiService.fetchPrintedVersions(
				card.prints_search_uri
			);

			if (callbackOnSuccess && paginationData) {
				callbackOnSuccess(paginationData);
			}

			return paginationData;
		} catch (error) {
			console.log(`error: ${error} while getting card data`);
		}
	}
}
