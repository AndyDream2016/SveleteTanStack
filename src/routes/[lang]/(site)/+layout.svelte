<script>
	import { onMount, onDestroy } from 'svelte';
	import Frontend from '$lib/theme/layout/Frontend.svelte';
	let { children } = $props();
	let observer; // Initialize observer without $state to avoid issues

	onMount(() => {
		const element = document.querySelector('main');
		if (element) {
			observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.attributeName === 'style') {
						// Check for scale changes here
						element.style.filter = `blur(${parseInt(mutation.target.style.borderRadius)}px)`;
					}
				});
			});
			observer.observe(element, { attributes: true });
		}
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
</script>

<Frontend>
	{@render children()}
</Frontend>
