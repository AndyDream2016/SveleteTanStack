<script lang="ts">
	import { twclsx } from '$lib/utils/twclsx.js';
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';

	let { faq = {} } = $props();

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected }
	} = createAccordion({
		multiple: false
	});

	let className = '';
	export { className as class };
</script>

<div class={twclsx('rounded-button border border-border', className)} {...$root}>
	{#each faq as { id, title, description }, i}
		<div
			use:melt={$item(id)}
			class="overflow-hidden transition-colors first:rounded-t-button
              last:rounded-b-button"
		>
			<div class="flex">
				<button
					use:melt={$trigger(id)}
					class={twclsx(
						'flex flex-1 cursor-pointer items-center justify-between',
						'px-5 py-5 text-sm lg:text-lg font-bold leading-none',
						'text-white transition-colors hover:bg-inputHover focus:!ring-0',
						'focus-visible:text-magnum-800',
						i !== 0 && 'border-t border-t-border'
					)}
				>
					<div class="text-left">{title}</div>
					<div>
						{#if $isSelected(id)}-{/if}{#if !$isSelected(id)}+{/if}
					</div>
				</button>
			</div>
			{#if $isSelected(id)}
				<div
					class={twclsx(
						'shadow-md',
						'overflow-hidden text-sm lg:text-base text-highlight border-t border-border'
					)}
					use:melt={$content(id)}
					transition:slide
				>
					<p class="px-5 py-4">
						{description}
					</p>
				</div>
			{/if}
		</div>
	{/each}
</div>
