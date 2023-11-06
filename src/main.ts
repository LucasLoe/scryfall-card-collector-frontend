import parseCards from "./functions/parseCards.ts";
import renderCardPreviews from "./functions/renderCardPreviews.ts";
import sampleDeckList from "./functions/sampleDeckList.ts";
import fetchData from "./functions/fetchData.ts";
import createZipFile from "./functions/createZipFile.ts";
import {
	cardTextArea,
	cardDisplayDiv,
	cardDisplayDivFetched,
	fetchBtn,
	downloadZipBtn,
} from "./components/elements.ts";
import initUserData from "./functions/initUserData.ts";

/**
 * Initialize app
 */

const userData = initUserData();

fetchBtn.onclick = () => {
	userData.userRequestCardArray.length != 0
		? fetchData(cardDisplayDivFetched, userData, () => setButtonVisibility(downloadZipBtn, "block"))
		: console.log("user request array has length zero!");
};

downloadZipBtn.onclick = () => {
	userData.fetchedData.imageUrls.length != 0
		? createZipFile({ downloadUrls: userData.fetchedData.pngUrls })
		: console.log("fetched user data image url array has length zero");
};

cardTextArea.addEventListener("input", () => {
	parseInputToUserRequestArray(cardTextArea.value);
	if (userData.userRequestCardArray.length != 0) {
		renderCardPreviews(cardDisplayDiv, userData.userRequestCardArray);
	}
});

/**
 * Initialize sample data
 */

cardTextArea.value = sampleDeckList();
parseInputToUserRequestArray(cardTextArea.value);

if (userData.userRequestCardArray.length != 0) {
	renderCardPreviews(cardDisplayDiv, userData.userRequestCardArray);
}

function parseInputToUserRequestArray(textAreaContent: string) {
	const { parsedLinesAsObjects, failedLines } = parseCards(textAreaContent);
	userData.failedRequestStrings = failedLines;
	userData.userRequestCardArray = parsedLinesAsObjects;
}

function setButtonVisibility(btnElement: HTMLButtonElement, visibility: "none" | "block" | "flex") {
	if (btnElement) {
		btnElement.style.display = visibility;
	}
}
