import jsPDF from "jspdf";
import { a4SizeInMm, pdfCardSizeInMm } from "../types";
import { sleep } from "../functions/helpers";

export class PdfService {
	private pdf;

	constructor() {
		this.pdf = new jsPDF({
			orientation: "portrait",
			unit: "mm",
		});
	}

	async downloadPdf(filename: string, data: { pngUrl: string; amount: number }[]) {
		const width = pdfCardSizeInMm.width - pdfCardSizeInMm.padding;
		const height = pdfCardSizeInMm.height - pdfCardSizeInMm.padding;

		const { imagesPerWidth, imagesPerHeight } = this.getNumOfImagesPerPage();

		const imageUrls: string[] = [];

		data.forEach((item) => {
			for (let i = 0; i < item.amount; i++) {
				imageUrls.push(item.pngUrl);
			}
		});

		const numPages = Math.ceil(imageUrls.length / (imagesPerHeight * imagesPerWidth));

		const extraSpaceWidth =
			(a4SizeInMm.width - pdfCardSizeInMm.width * imagesPerWidth) / (2 + imagesPerWidth);
		const extraSpaceHeight =
			(a4SizeInMm.height - pdfCardSizeInMm.height * imagesPerHeight) / (2 + imagesPerHeight);

		const pagePadding = {
			width: extraSpaceWidth > 0 ? extraSpaceWidth : 0,
			height: extraSpaceHeight > 0 ? extraSpaceHeight : 0,
		};

		let cardIdx = 0;

		for (let page = 0; page < numPages; page++) {
			for (let row = 0; row < imagesPerHeight; row++) {
				for (let col = 0; col < imagesPerWidth; col++) {
					if (cardIdx < imageUrls.length) {
						const imageUrl = imageUrls[cardIdx];
						console.log(imageUrl);
						await sleep(200);
						const img = new Image();
						img.src = imageUrl;

						this.pdf.addImage({
							imageData: img,
							format: "JPEG",
							x: col * width + (col + 1) * pagePadding.width,
							y: row * height + (row + 1) * pagePadding.height,
							width: width,
							height: height,
						});

						cardIdx += 1;
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
