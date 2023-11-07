export type userCardRequest = {
	cardName: string;
	amount: number;
};

export type UserDataProps = {
	userRequestCardArray: userCardRequest[];
	failedRequestStrings: string[];
	fetchedData: {
		fetchResponse: ServerResponse | null;
		imageUrls: string[];
		pngUrls: string[];
	};
};

export type ServerResponse = {
	fetchedCards: {
		cardName: string;
		data: fetchedCardData;
	}[];
	rejectedCard: {
		cardName: string;
		data: null;
	}[];
};

export type fetchedCardData = {
	artist: string;
	artist_ids: string[];
	booster: Boolean;
	border_color: string;
	card_faces?: {
		artist: string;
		image_uris: {
			small: string;
			normal: string;
			large: string;
			art_crop: string;
			border_crop: string;
			png: string;
		};
	}[];
	cmc: number;
	collector_number: 250;
	color_identity: string[];
	colors: string[];
	digital: boolean;
	finishes: string[];
	foil: boolean;
	frame: string;
	full_art: boolean;
	games: string[];
	highres_image: boolean;
	id: string;
	illustration_id: string;
	image_status: string;
	image_uris?: {
		small: string;
		normal: string;
		large: string;
		art_crop: string;
		border_crop: string;
		png: string;
	};
	keywords: string[];
	lang: string[];
	layout: string;
	mana_cost: string;
	name: string;
	oracle_id: string;
	oracle_text: string;
	prints_search_uri: string;
	scryfall_uri: string;
	set: string;
	set_name: string;
	type_line: string;
	uri: string;
};

export enum apiUrls {
	localhost = "http://localhost:8000",
	render = "https://scryfall-api-node-js.onrender.com",
}

export enum routes {
	multipleCards = "/api/search-array",
}
