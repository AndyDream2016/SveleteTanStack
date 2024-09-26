<script>
	import MdiChevronDown from '~icons/mdi/chevron-down';
	import MdiChevronUp from '~icons/mdi/chevron-up';
	import MdiCheck from '~icons/mdi/check';
	import RiCheckDoubleLine from '~icons/ri/check-double-line';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let {
		onChange,
		options = [],
		showLabel = true,
		labelText = 'Select',
		showIconSelected = false,
		showCheckmark = true,
		multiple = false,
		defaultSelected = null,
		placeholder = 'Select an option',
		selectedClass = ''
	} = $props();

	let optionsLength = $state(options.filter((opt) => !opt.disabled).length);
	let selectedIcons = $state([]);

	const onSelectedChange = ({ curr, next }) => {
		if (onChange) onChange(next);
		if (showIconSelected)
			selectedIcons = next.map((opt) => options.find((o) => o.value === opt.value).icon);
		return next;
	};

	export const changeSelected = (newSelected) => {
		selected.set(options.find((opt) => opt.value === newSelected));
	};

	const toggleSelectedAll = () => {
		if (allSelected) selected.set([]);
		else selected.set(options.filter((opt) => !opt.disabled));
	};

	const {
		elements: { trigger, menu, option, label },
		states: { selectedLabel, selected, open },
		helpers: { isSelected }
	} = createSelect({
		forceVisible: true,
		defaultSelected: multiple ? [] : defaultSelected,
		multiple: multiple,
		onSelectedChange: onSelectedChange,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		}
	});

	let allSelected = $derived(multiple && $selected.length === optionsLength);
</script>

<div class="flex flex-col gap-1">
	{#if showLabel}
		<!-- svelte-ignore a11y_label_has_associated_control - $label contains the 'for' attribute -->
		<label class="inline-flex label cursor-pointer text-xs md:text-sm pb-3" use:melt={$label}
			>{labelText}</label
		>
	{/if}
	<button
		class={`flex px-4 items-center justify-between rounded-button border border-border
     text-black hover:bg-inputHover text-xs md:text-sm ${selectedClass} ${$selectedLabel ? 'text-highlight' : 'text-text'}`}
		use:melt={$trigger}
		aria-label="Food"
	>
		<div class="truncate py-1.5">
			{#if $selectedLabel && showIconSelected}
				{selectedIcons}
			{:else if $selectedLabel}
				{$selectedLabel}
			{:else}
				{placeholder}
			{/if}
		</div>
		{#if $open}
			<MdiChevronUp class="size-5" />
		{:else}
			<MdiChevronDown class="size-5" />
		{/if}
	</button>
	{#if $open}
		<div
			class=" z-10 flex max-h-[300px] flex-col
    overflow-y-auto rounded-lg bg-modal px-2 py-2 text-highlight space-y-1
    shadow focus:!ring-0"
			use:melt={$menu}
			transition:fly={{ duration: 250, y: -5 }}
		>
			{#if options.length === 0}
				<div class={`relative text-text flex justify-between cursor-pointer p-3`}>No Items</div>
			{:else}
				{#if multiple}
					<button
						onclick={toggleSelectedAll}
						class={`relative flex justify-between cursor-pointer rounded-lg p-3
              hover:bg-modalTintHover focus:z-10
              data-[disabled]:opacity-50 ${allSelected ? 'bg-modalTintHover hover:text-highlight' : ''}`}
					>
						<div>{'All'}</div>
						{#if allSelected && showCheckmark}
							<RiCheckDoubleLine />
						{/if}
					</button>
					<hr class="w-[90%] border-text ml-[5%] my-2" />
				{/if}
				{#each options as item}
					<div
						class={`relative flex justify-between cursor-pointer rounded-lg p-3
              hover:bg-modalTintHover focus:z-10
              data-[disabled]:opacity-50 ${$isSelected(item.value) ? 'bg-modalTintHover hover:text-highlight' : ''}`}
						use:melt={$option({ value: item.value, label: item.label, disabled: item.disabled })}
					>
						<div>{item.label}</div>
						{#if $isSelected(item.value) && showCheckmark}
							<MdiCheck />
						{/if}
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	.check {
		position: absolute;
		left: 12px;
		top: 50%;
		z-index: 20;
		translate: 0 calc(-50% + 1px);
	}
</style>
