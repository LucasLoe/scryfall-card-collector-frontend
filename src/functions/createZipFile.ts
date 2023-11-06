import JSZip from "jszip";

type createZipFileProps = {
	downloadUrls: string[];
};

export default async function createZipFile(props: createZipFileProps) {
	const { downloadUrls } = props;
	const zipFileName = `deck_images_${new Date().toISOString()}`;
	const zip = new JSZip();

	// Function to download an image and add it to the ZIP
	async function downloadAndAddToZip(url: string, filename: string) {
		console.log('fired')
		const response = await fetch(url);
		const blob = await response.blob();
		zip.file(filename, blob);
	}

	// Download and add each image to the ZIP
	for (let i = 0; i < downloadUrls.length; i++) {
		const imageUrl = downloadUrls[i];
		await downloadAndAddToZip(imageUrl, `image_${i + 1}.jpg`);
	}

	// Generate the ZIP file
	zip.generateAsync({ type: "blob" }).then(function (blob: any) {
		const zipFilename = `${zipFileName}.zip`;

		// Create an anchor element to trigger the download
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = zipFilename;

		// Trigger a click event on the anchor element
		const event = new MouseEvent("click");
		link.dispatchEvent(event);
	});
}
