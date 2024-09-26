<script>
	import { ripple } from '$lib/theme/ui/ripple.js';
	import { twclsx } from '$lib/utils/twclsx.js';

	// Using Svelte 5's $props to define props
	let {
		className,
		label,
		type = 'primary',
		paddingX = 'px-3 md:px-4',
		paddingY = 'py-1',
		disabled = false,
		href = null,
		onclick = null,
		aria = null,
		children,
		action,
		active = false // New prop to control active state
	} = $props();

	let typeClassMap = $derived({
		primary: active
			? 'bg-primary text-primaryButton' // No hover if active
			: 'bg-primary hover:bg-primaryTint text-primaryButton',
		secondary: active
			? 'bg-secondary text-secondaryButton' // No hover if active
			: 'bg-secondary hover:bg-secondaryTint text-secondaryButton',
		tint: active ? 'bg-tint' : 'bg-tint hover:bg-tintHover',
		third: active ? 'bg-primary text-invert' : 'bg-none border-border border-1 hover:bg-third',
		striped: active
			? 'bg-none border-border border-dashed text-invert'
			: 'bg-none border-2 border-border border-dashed hover:bg-third text-highlight'
	});

	let classes = $derived(
		twclsx(
			'!flex items-center justify-center rounded-button font-button text-sm md:text-base focus:ring-0',
			typeClassMap[type],
			paddingX,
			paddingY,
			className
		)
	);
</script>

{#if href}
	<a {href} class={classes} aria-label={aria} use:ripple>
		{@render children()}
	</a>
{:else}
	<button use:ripple class={classes} {disabled} {onclick} aria-label={aria} {action}>
		{@render children()}
	</button>
{/if}
