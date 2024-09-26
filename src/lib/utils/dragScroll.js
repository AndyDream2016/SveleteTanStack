export function dragToScroll(node) {
	const slider = node;
	const cover = slider.getElementsByClassName('scroll-drag-cover')[0];

	let isDown = false;
	let startX;
	let scrollLeft;

	const mouseDown = (e) => {
		isDown = true;
		slider.classList.add('cursor-grabbing');
		if (cover) cover.classList.remove('hidden');
		startX = e.pageX - slider.offsetLeft;
		scrollLeft = slider.scrollLeft;
	};

	const mouseLeave = () => {
		isDown = false;
		slider.classList.remove('cursor-grabbing');
		if (cover) cover.classList.add('hidden');
	};

	const mouseUp = () => {
		isDown = false;
		slider.classList.remove('cursor-grabbing');
		if (cover) cover.classList.add('hidden');
	};

	const mouseMove = (e) => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - slider.offsetLeft;
		const walk = (x - startX) * 3; //scroll-fast
		slider.scrollLeft = scrollLeft - walk;
	};

	slider.addEventListener('mousedown', mouseDown);
	slider.addEventListener('mouseleave', mouseLeave);
	slider.addEventListener('mouseup', mouseUp);
	slider.addEventListener('mousemove', mouseMove);

	return () => {
		slider.removeEventListener('mousedown', mouseDown);
		slider.removeEventListener('mouseleave', mouseLeave);
		slider.removeEventListener('mouseup', mouseUp);
		slider.removeEventListener('mousemove', mouseMove);
	};
}
