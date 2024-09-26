<script>
	import { twclsx } from '$lib/utils/twclsx.js';
	let { children, className, active = false } = $props();
</script>

<div
	class={twclsx(
		'w-4 h-4 md:w-6 md:h-6 z-1 mt-[1px] rounded-full flex items-center justify-center font-extrabold text-xs ring-2 ring-background shrink-0',
		active ? 'bg-primary text-badgeTextActive' : 'bg-badge text-badgeText',
		className
	)}
>
	{@render children()}
</div>
