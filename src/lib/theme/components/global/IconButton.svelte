<script>
	import { ripple } from '$lib/theme/ui/ripple.js';
	import { twclsx } from '$lib/utils/twclsx.js';

	// Using Svelte 5's $props to define props
	let {
		className = '',
		active = false,
		label,
		type = 'primary',
		paddingX = 'px-4',
		paddingY = 'py-1',
		disabled = false,
		href = null,
		onclick = null,
		parent = null,
		aria = '',
		target = null,
		children
	} = $props();

	let classes = $state(
		`!flex items-center justify-center rounded-full w-10 h-10 transition ease-in-out ${active ? 'bg-tint text-active' : 'hover:bg-iconHover'} ${className}`
	);

	$effect(() => {
		classes = twclsx(
			`!flex items-center justify-center rounded-full w-10 h-10 transition ease-in-out ${active ? 'bg-tint text-active' : 'hover:bg-iconHover'}`,
			className // Append the className prop
		);
	});
</script>

{#if parent}
	<div class={parent}>
		{#if href}
			<a {href} class={classes} aria-label={aria} use:ripple={{ duration: 0.5 }}>
				<div class="flex justify-center">{@render children()}</div>
			</a>
		{:else}
			<button use:ripple={{ duration: 0.5 }} aria-label={aria} class={classes} {disabled} {onclick}>
				<div class="flex justify-center">{@render children()}</div>
			</button>
		{/if}
	</div>
{:else if href}
	<a {href} class={classes} aria-label={aria} use:ripple={{ duration: 0.5 }} target={target}>
		<div class="flex justify-center">{@render children()}</div>
	</a>
{:else}
	<button use:ripple={{ duration: 0.5 }} aria-label={aria} class={classes} {disabled} {onclick}>
		<div class="flex justify-center">{@render children()}</div>
	</button>
{/if}
