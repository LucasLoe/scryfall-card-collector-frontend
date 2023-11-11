import JSZip from "jszip";

export default class ZipService {
	private _zip;

	constructor() {
		this._zip = new JSZip();
	}

	private async _addImageToZip(url: string, filename: string) {
		const response = await fetch(url);
		const blob = await response.blob();
		this._zip.file(filename, blob);
	}

	async downloadZip(filename: string, urls: string[]) {
		for (let i = 0; i < urls.length; i++) {
			const imageUrl = urls[i];
			await this._addImageToZip(imageUrl, `image_${i + 1}.jpg`);
		}

		this._zip.generateAsync({ type: "blob" }).then(function (blob: any) {
			const zipFilename = `${filename}.zip`;

			// Create an anchor element to trigger the download
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = zipFilename;

			// Trigger a click event on the anchor element
			const event = new MouseEvent("click");
			link.dispatchEvent(event);
		});
	}
}
