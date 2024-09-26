<script>
	import { twclsx } from '$lib/utils/twclsx.js';
	let { children, className, active = false } = $props();
</script>

<div
	class={twclsx(
		'h-4 md:h-6 z-1 mt-[1px] px-2 rounded-full flex items-center justify-center font-extrabold text-xs ring-2 ring-background shrink-0',
		active ? 'bg-primary text-black' : 'bg-badge text-badgeText',
		className
	)}
>
	{@render children()}
</div>
