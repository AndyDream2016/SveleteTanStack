<script>
	import { LL } from '$i18n/i18n-svelte';
	import Button from '$lib/theme/components/global/Button.svelte';
	import Combobox from '$lib/theme/components/global/Combobox.svelte';
	import Tooltip from '$lib/melt/Tooltip.svelte';
	import PhSortAscending from '~icons/ph/sort-ascending';
	import PhSortDescending from '~icons/ph/sort-descending';
	import MdiSortVariantOff from '~icons/mdi/sort-variant-off';

	let sortSelecter = $state();

	let { sortData = $bindable(), sortState = $bindable(), onChange } = $props();

	function handleSortSelect(sort) {
		if (sortState) sortState = { ...sortState, column: sort.value };
		if (sortState.order !== 'none') onChange();
	}

	export const changeSortColumn = (newColumn) => {
		sortSelecter.changeSelected(newColumn);
	};
</script>

<div class="flex">
	<Tooltip text="Sort">
		<Button
			className={`h-8 rounded-none rounded-l-button`}
			label="Test"
			type="third"
			paddingY="py-0"
			onclick={() => {
				if (sortState)
					sortState = {
						...sortState,
						order: sortState.order === 'none' ? 'desc' : sortState.order === 'asc' ? 'none' : 'asc'
					};
				onChange();
			}}
			paddingX="px-1"
		>
			{#if sortState.order === 'none'}
				<MdiSortVariantOff class="w-6 h-6 shrink-0" />
			{:else if sortState.order === 'asc'}
				<PhSortDescending class="w-6 h-6 shrink-0 text-highlight" />
			{:else}
				<PhSortAscending class="w-6 h-6 shrink-0 text-highlight" />
			{/if}
		</Button>
	</Tooltip>
	<Combobox
		bind:this={sortSelecter}
		onChange={handleSortSelect}
		options={sortData}
		defaultSelected={sortData[0]}
		placeholder={$LL.selectnetwork()}
		showLabel={false}
		showCheckmark={false}
		selectedClass={`h-8 rounded-none rounded-r-button ml-0.5 w-[100px]`}
	/>
</div>
