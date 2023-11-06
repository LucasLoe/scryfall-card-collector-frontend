export const app = document.querySelector<HTMLDivElement>("#app")!;
export const cardTextArea = document.querySelector<HTMLTextAreaElement>("#card-textarea")!;
export const cardDisplayDiv = document.querySelector<HTMLDivElement>("#card-display-div")!;
export const cardDisplayDivFetched = document.querySelector<HTMLDivElement>(
	"#card-display-div-fetched"
)!;
export const fetchBtn = document.querySelector<HTMLButtonElement>("#fetch-btn")!;
export const downloadZipBtn = document.querySelector<HTMLButtonElement>("#btn--download-zip")!;

// remove ! and use a suitable type-guard?