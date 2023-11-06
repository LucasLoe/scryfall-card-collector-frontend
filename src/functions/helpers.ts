export function triggerInputEvent(element: HTMLInputElement | HTMLTextAreaElement) {
	const event = new Event("input", {
		bubbles: true,
		cancelable: true,
	});
	element.dispatchEvent(event);
}
