import { onMount } from 'svelte';

const INEVENTS = ['pointerdown'];
const OUTEVENTS = ['pointerup', 'pointerleave'];
const ATTR_NAME = 'svelte-ripple-effect-ready';
const ATTR_CENTER_NAME = 'ripple-center';

function addEvent(el, event, handler) {
	el.addEventListener(event, handler);
}

function removeEvent(el, event, handler) {
	el.removeEventListener(event, handler);
}

function findFurthestPoint(x, width, left, y, height, top) {
	return Math.sqrt(
		Math.max(x - left, width - (x - left)) ** 2 + Math.max(y - top, height - (y - top)) ** 2
	);
}

export function ripple(el, options = {}) {
	const addClassIfMissing = () => {
		if (!el.getAttribute(ATTR_NAME)) {
			el.setAttribute(ATTR_NAME, '');
			// Add necessary styles for the parent element
			el.style.position = 'relative';
			el.style.overflow = 'hidden';
			el.style.display = 'inline-block';
			el.style.transition = 'background-color 0.2s';
		}

		if (options.center) {
			el.setAttribute(ATTR_CENTER_NAME, '');
		} else {
			el.removeAttribute(ATTR_CENTER_NAME);
		}
	};

	onMount(() => {
		addClassIfMissing();
	});

	let maximumRadius = 0;

	const setOptions = (options) => {
		if (options.color) {
			el.style.setProperty('--ripple-color', options.color);
		}

		if (options.duration) {
			el.style.setProperty('--ripple-duration', options.duration + 's');
		}

		if (options.maxRadius) {
			maximumRadius = options.maxRadius;
		}
	};

	setOptions(options);

	const createRipple = (e) => {
		if (options.disabled) return;

		e.stopPropagation();

		addClassIfMissing();

		const rect = el.getBoundingClientRect();
		const radius = findFurthestPoint(
			e.clientX,
			el.offsetWidth,
			rect.left,
			e.clientY,
			el.offsetHeight,
			rect.top
		);

		const ripple = document.createElement('div');
		ripple.classList.add('ripple');

		let size = radius * 2;
		let top = e.clientY - rect.top - radius;
		let left = e.clientX - rect.left - radius;

		if (maximumRadius && size > maximumRadius) {
			size = maximumRadius * 2;
			top = e.clientY - rect.top - maximumRadius;
			left = e.clientX - rect.left - maximumRadius;
		}

		ripple.style.left = left + 'px';
		ripple.style.top = top + 'px';
		ripple.style.width = ripple.style.height = size + 'px';

		el.appendChild(ripple);

		const removeRipple = () => {
			const timeOutDuration = options.duration ? options.duration * 1000 : 1000;

			if (ripple !== null) {
				setTimeout(() => {
					ripple.style.opacity = '0';
				}, timeOutDuration / 4);

				setTimeout(() => {
					ripple.remove();
				}, timeOutDuration);
			}
		};

		OUTEVENTS.forEach((event) => {
			addEvent(el, event, removeRipple);
		});
	};

	INEVENTS.forEach((event) => {
		addEvent(el, event, createRipple);
	});

	return {
		destroy() {
			INEVENTS.forEach((event) => {
				removeEvent(el, event, createRipple);
			});
		},
		update(newOptions) {
			options = newOptions;
			setOptions(newOptions);
		}
	};
}
