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
	printData: PrintUserData[];
};

export type ServerResponse = {
	fetchedCards: {
		cardName: string;
		amount: number;
		data: fetchedCardData;
	}[];
	rejectedCard: {
		cardName: string;
		amount: number;
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

export type PrintUserData = {
	data: fetchedCardData;
	amount: number;
};

export type PrintedCardVersions = {
	object: string;
	total_cards: number;
	has_more: boolean;
	data: fetchedCardData[];
};

export enum routes {
	multipleCards = "/api/search-array",
}

export enum pdfCardSizeInMm {
	width = 63,
	height = 88,
	padding = 1,
}

export enum a4SizeInMm {
	width = 210,
	height = 297,
}
