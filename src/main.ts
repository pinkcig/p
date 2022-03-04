import { POP } from './content';
import './style.css';

// Avoid people opening devtools because I'm a bitch
document.addEventListener('contextmenu', (event) => event.preventDefault());
document.addEventListener('keydown', (event) => {
	if (event.keyCode === 123 || (event.ctrlKey && event.shiftKey && event.keyCode === 73)) event.preventDefault();
});

document.addEventListener('DOMContentLoaded', async () => {
	await POP.play();

	document.addEventListener('click', () => POP.play());
});

document.querySelectorAll('[data-include]').forEach(async (element) => {
	const url = `/views/${element.getAttribute('data-include')}.html`;

	await fetch(url)
		.catch(() => null)
		.then(async (response) => {
			element.innerHTML = await response!.text();
		});
});

document.querySelectorAll('pre').forEach((element) => {
	element.addEventListener('click', () => {
		navigator.clipboard.writeText(element.innerText);
		const toast = document.createElement('div');

		toast.classList.add('toast');
		toast.innerText = 'Copied to clipboard';

		document.body.appendChild(toast);
		setTimeout(() => {
			toast.remove();
		}, 3000);
	});
});
