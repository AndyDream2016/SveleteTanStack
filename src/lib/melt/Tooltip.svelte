<script>
	import { onMount, onDestroy } from 'svelte';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { writable } from 'svelte/store';

	const { placement, text } = $props();

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: placement || 'top'
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
	});

	let autoCloseTimer;

	function toggleTooltip() {
		open.update((value) => true);
	}

	// Function to handle closing the tooltip
	function closeTooltip() {
		open.set(false);
	}

	function tooltipContent(node) {
		// Extend auto-close timer on click
		function onClick() {
			clearTimeout(autoCloseTimer);
			autoCloseTimer = setTimeout(closeTooltip, 3000);
		}

		node.addEventListener('click', onClick);

		return {
			destroy() {
				node.removeEventListener('click', onClick);
			}
		};
	}

	let triggerElement; // This should be set to your trigger DOM element
	let contentElement; // This should be set to your content DOM element directly

	// Set up auto-close and click outside listeners
	onMount(() => {
		open.subscribe((value) => {
			clearTimeout(autoCloseTimer); // Clear any existing timer
			if (value) {
				// If tooltip is open, start the auto-close timer
				autoCloseTimer = setTimeout(closeTooltip, 3000);
			}
		});

		// Function to handle click outside
		const handleClickOutside = (event) => {
			if (content && !content.contains(event.target) && !trigger.contains(event.target)) {
				closeTooltip();
			}
		};

		// Function to handle click or touch outside
		const handleEventOutside = (event) => {
			// Determine if the click was inside the trigger or content by traversing up the DOM tree
			let targetElement = event.target;
			let clickInsideTriggerOrContent = false;

			while (targetElement) {
				// Check if the current target element is the trigger or content element
				if (targetElement === triggerElement || targetElement === contentElement) {
					clickInsideTriggerOrContent = true;

					break;
				}
				// Move up the DOM tree
				targetElement = targetElement.parentNode;
			}

			// Close the tooltip only if the click was outside both the trigger and content elements
			if (!clickInsideTriggerOrContent) {
				closeTooltip();
			}
		};

		// Add click and touchend event listeners to window
		window.addEventListener('click', handleEventOutside);
		window.addEventListener('touchend', handleEventOutside);

		// Return a cleanup function to remove the event listeners when the component is destroyed
		return () => {
			window.removeEventListener('click', handleEventOutside);
			window.removeEventListener('touchend', handleEventOutside);
		};
	});

	onDestroy(() => {
		clearTimeout(autoCloseTimer); // Ensure timer is cleared to prevent leaks
	});
</script>

<div bind:this={triggerElement} class="trigger" use:melt={$trigger} on:click={toggleTooltip}>
	<slot />
</div>

{#if $open}
	<div
		bind:this={contentElement}
		class="content z-10 rounded-lg bg-card shadow"
		use:melt={$content}
		use:tooltipContent
	>
		<div use:melt={$arrow} />
		<p class="px-2 py-0.5 text-xs text-highlight">{text}</p>
	</div>
{/if}
