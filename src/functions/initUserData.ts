import { UserDataProps } from "../types";

export default function initUserData(): UserDataProps {
	return {
		userRequestCardArray: [],
		failedRequestStrings: [],
		fetchedData: {
			fetchResponse: null,
			imageUrls: [],
			pngUrls: []
		},
	};
}
