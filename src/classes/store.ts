import { getImageUrlsFromServerResponse, getPngUrlsFromServerResponse } from "../functions/helpers";
import initUserData from "../functions/initUserData";
import { UserDataProps, ServerResponse, apiUrls, routes } from "../types";
import { ApiService } from "./apiService";

export default class Store {
	private _userData: UserDataProps;
	private _apiService: ApiService;
	private _apiUrl;

	constructor(apiUrl: apiUrls, userData?: UserDataProps) {
		console.log(userData);
		this._userData = userData ? userData : initUserData();
		this._apiUrl = apiUrl;
		this._apiService = new ApiService(this._apiUrl, routes.multipleCards);
	}

	public get userData(): UserDataProps {
		return this._userData;
	}

	public get downloadUrls(): string[] {
		return this._userData.fetchedData.pngUrls;
	}

	public set userData(data: UserDataProps) {
		this._userData = data;
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

				if (callbackOnSuccess && data) {
					callbackOnSuccess(data);
				}
			}
		} catch (error) {
			console.error(`Error: ${error}`);
		}
	}
}
