import jsPDF from "jspdf";
import { a4SizeInMm, pdfCardSizeInMm } from "../types";
import { sleep } from "../functions/helpers";

export class PdfService {
	private pdf: jsPDF;

	constructor() {
		this.pdf = new jsPDF({
			orientation: "portrait",
			unit: "mm",
		});
	}

	instanciateNewPdf() {
		this.pdf = new jsPDF({
			orientation: "portrait",
			unit: "mm",
		});
	}

	getLengthScales() {
		const width = pdfCardSizeInMm.width - pdfCardSizeInMm.padding;
		const height = pdfCardSizeInMm.height - pdfCardSizeInMm.padding;

		const { imagesPerWidth, imagesPerHeight } = this.getNumOfImagesPerPage();

		const extraSpaceWidth =
			(a4SizeInMm.width - pdfCardSizeInMm.width * imagesPerWidth) / (2 + imagesPerWidth);
		const extraSpaceHeight =
			(a4SizeInMm.height - pdfCardSizeInMm.height * imagesPerHeight) / (2 + imagesPerHeight);

		const pagePadding = {
			width: extraSpaceWidth > 0 ? extraSpaceWidth : 0,
			height: extraSpaceHeight > 0 ? extraSpaceHeight : 0,
		};

		return {
			width: width,
			height: height,
			extraSpaceWidth: extraSpaceWidth,
			extraSpaceHeight: extraSpaceHeight,
			pagePadding: pagePadding,
		};
	}

	async downloadPdf(
		filename: string,
		imageUrls: string[],
		progressCallback: (normalizedNumber: number) => void
	) {
		this.instanciateNewPdf();
		const { imagesPerWidth, imagesPerHeight } = this.getNumOfImagesPerPage();
		const numPages = Math.ceil(imageUrls.length / (imagesPerHeight * imagesPerWidth));
		const { width, height, pagePadding } = this.getLengthScales();

		let cardIdx = 0;

		for (let page = 0; page < numPages; page++) {
			for (let row = 0; row < imagesPerHeight; row++) {
				for (let col = 0; col < imagesPerWidth; col++) {
					if (cardIdx < imageUrls.length) {
						await sleep(100);
						const imageUrl = imageUrls[cardIdx];
						const img = new Image();
						img.src = imageUrl + "?r=" + Math.floor(Math.random() * 100000);

						this.pdf.addImage({
							imageData: img,
							format: "JPEG",
							x: col * width + (col + 1) * pagePadding.width,
							y: row * height + (row + 1) * pagePadding.height,
							width: width,
							height: height,
						});

						cardIdx += 1;

						if (progressCallback) {
							progressCallback(cardIdx / imageUrls.length);
						}
					}
				}
			}

			if (page < numPages - 1) {
				this.pdf.addPage();
			}
		}

		this.pdf.save(`${filename}.pdf`);
	}

	getNumOfImagesPerPage() {
		const width = pdfCardSizeInMm.width - pdfCardSizeInMm.padding;
		const height = pdfCardSizeInMm.height - pdfCardSizeInMm.padding;
		const a4Width = a4SizeInMm.width;
		const a4Height = a4SizeInMm.height;

		return {
			imagesPerWidth: Math.floor(a4Width / width),
			imagesPerHeight: Math.floor(a4Height / height),
		};
	}
}
