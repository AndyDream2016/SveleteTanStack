<script>
	let filters = $state([
		{ id: 'liquidity', name: 'Liquidity', value: 1000, unit: '$' },
		{ id: 'mcap', name: 'Market cap', unit: '$' },
		{ type: 'divider', visible: false },
		{ id: 'price', name: 'Price', unit: '$' },
		{ id: 'age', name: 'Pair age', unit: ['Hours', 'Days', 'Months'], multiUnit: 0 },
		{ type: 'divider', visible: true },
		{ id: 'txns', name: '24h txns', unit: '' },
		{ id: '', name: '24h buys', unit: '' },
		{ id: '', name: '24h sells', unit: '' },
		{ id: 'volume', name: '24h volume', unit: '$' },
		{ id: '24h', name: '24h change', unit: '%' },
		{ type: 'divider', visible: true },
		{ id: '', name: '6h txns', unit: '' },
		{ id: '', name: '6h buys', unit: '' },
		{ id: '', name: '6h sells', unit: '' },
		{ id: '', name: '6h volume', unit: '$' },
		{ id: '6h', name: '6h change', unit: '%' },
		{ type: 'divider', visible: true },
		{ id: '', name: '1h txns', unit: '' },
		{ id: '', name: '1h buys', unit: '' },
		{ id: '', name: '1h sells', unit: '' },
		{ id: '', name: '1h volume', unit: '$' },
		{ id: '1h', name: '1h change', unit: '%' },
		{ type: 'divider', visible: true },
		{ id: '', name: '5M txns', unit: '' },
		{ id: '', name: '5M buys', unit: '' },
		{ id: '', name: '5M sells', unit: '' },
		{ id: '', name: '5M volume', unit: '$' },
		{ id: '5m', name: '5M change', unit: '%' }
	]);

	let { filterValues = $bindable(new Map()), onChange } = $props();

	let localFilterValues = $state(new Map());

	function handleApply() {
		for (const [key, value] of localFilterValues) {
			filterValues.set(key, value);
		}
		filterValues = new Map(filterValues);
		onChange();
	}

	function handleClear() {
		for (const [key] of filterValues) {
			if (filters.find((filter) => filter.id === key)) {
				filterValues.delete(key);
			}
		}
		filterValues = new Map(filterValues);
		localFilterValues = new Map();
		onChange();
	}

	function handleInput(filterId, type, event) {
		const value = event.target.value.trim();
		let filterEntry = localFilterValues.get(filterId) || {};

		if (value === '') {
			delete filterEntry[type];
		} else {
			filterEntry[type] = parseFloat(value);
		}

		if (Object.keys(filterEntry).length === 0) {
			localFilterValues.delete(filterId);
		} else {
			localFilterValues.set(filterId, filterEntry);
		}
	}
</script>

<div class="bg-modal rounded-lg max-h-[300px] overflow-y-scroll no-scrollbar">
	<div class="space-y-4">
		{#each filters as filter}
			{#if filter.type}
				<div class="h-1 p-3">
					{#if filter.visible}
						<div class="h-[1px] bg-text w-full"></div>
					{/if}
				</div>
			{:else}
				<div class="grid grid-cols-[100px_200px_200px] gap-x-2">
					<div class="w-24 text-right pt-1">{filter.name}:</div>
					<div class="min-input-filter flex gap-0.5">
						<input
							type="text"
							class="bg-background flex-grow min-w-0 text-highlight px-2 py-1 rounded border-text"
							class:rounded-r-none={filter.unit}
							placeholder="Min"
							oninput={(e) => handleInput(filter.id, 'min', e)}
							value={localFilterValues.get(filter.id)?.min ?? ''}
						/>
						{#if filter.unit && filter.multiUnit !== undefined}
							<button
								onclick={() => {
									filter.multiUnit = (filter.multiUnit + 1) % filter.unit.length;
								}}
								class="bg-background px-2 py-0.5 rounded-r border-text border"
							>
								{filter.unit[filter.multiUnit]}
							</button>
						{:else if filter.unit}
							<div class="bg-background px-2 py-0.5 rounded-r border-text border">
								{filter.unit}
							</div>
						{/if}
					</div>
					<div class="max-input-filter flex gap-0.5">
						<input
							type="text"
							class="bg-background flex-grow min-w-0 text-highlight px-2 py-1 rounded border-text"
							placeholder="Max"
							oninput={(e) => handleInput(filter.id, 'max', e)}
							value={localFilterValues.get(filter.id)?.max ?? ''}
						/>
						{#if filter.unit && filter.multiUnit !== undefined}
							<button
								onclick={() => {
									filter.multiUnit = (filter.multiUnit + 1) % filter.unit.length;
								}}
								class="bg-background px-2 py-0.5 rounded-r border-text border"
							>
								{filter.unit[filter.multiUnit]}
							</button>
						{:else if filter.unit}
							<div class="bg-background px-2 py-0.5 rounded-r border-text border">
								{filter.unit}
							</div>
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>

	<div class="mt-4 flex justify-end">
		<button
			class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			onclick={handleApply}
		>
			Apply
		</button>
		<button
			class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			onclick={handleClear}
		>
			Clear
		</button>
	</div>
</div>
