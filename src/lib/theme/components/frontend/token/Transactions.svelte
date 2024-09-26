<script>
	import Table from '$lib/table/Table.svelte';
	import { generateDummyData } from '$lib/theme/components/frontend/explore/coinboard/generate.js';
	import Button from '$lib/theme/components/global/Button.svelte';
	import MorphMenu from '$lib/components/frontend/morph-menu/Menu.svelte';
	import MorphMenuItem from '$lib/components/frontend/morph-menu/MenuItem.svelte';
	import BasilSettingsAdjustSolid from '~icons/basil/settings-adjust-solid';
	import MdiSort from '~icons/mdi/sort';
	import { renderComponent } from '@tanstack/svelte-table';
	import { LL } from '$i18n/i18n-svelte';
	import TableCellToken from '$lib/table/components/cells/TableCellToken.svelte';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import Tooltip from '$lib/melt/Tooltip.svelte';
	import { createCombobox, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import MdiChevronUp from '~icons/mdi/chevron-up';
	import MdiChevronDown from '~icons/mdi/chevron-down';
	import PhSortAscending from '~icons/ph/sort-ascending';
	import MdiCheck from '~icons/mdi/check';
	import { dragToScroll } from '$lib/utils/dragScroll.js';
	import TableSort from '$lib/table/TableSort.svelte';
	import TableChain from '$lib/table/TableChain.svelte';
	import TableFilter from '$lib/table/TableFilter.svelte';
	import { onMount, untrack } from 'svelte';
	import TableCellAmount from '$lib/table/components/cells/TableCellAmount.svelte';
	import { debounce } from '@melt-ui/svelte/internal/helpers';

	let scrollContainer1 = $state();
	let tableRef = $state();
	let tableInitialRender = $state(true);

	let scrollObserver = $state();

	const rowData = $state(generateDummyData(50));

	const filterMinMax = (row, columnId, filterValue) =>
		parseFloat(row.getValue(columnId)) <= parseFloat(filterValue.max || Number.NEGATIVE_INFINITY) &&
		parseFloat(row.getValue(columnId)) >= parseFloat(filterValue.min || Number.POSITIVE_INFINITY);

	export const columnDef = $state([
		{
			accessorKey: 'token',
			header: () => $LL.token(),
			pinned: true,
			enableSorting: false,
			minWidth: 300,
			maxWidth: 4000,
			cell: (info) => renderComponent(TableCellToken, { data: info.getValue() }),
			filterFn: (row, columnId, filterValue) =>
				filterValue.length === 0 || filterValue.includes(row.getValue(columnId).blockchainId)
		},
		{
			accessorKey: 'price',
			header: () => $LL.price(),
			cell: (info) => `$${info.getValue()}`,
			filterFn: filterMinMax
		},
		{
			accessorKey: 'age',
			header: 'Age',
			cell: (info) => info.getValue(),
			filterFn: filterMinMax
		},
		{
			accessorKey: 'txns',
			header: 'Txns',
			cell: (info) => info.getValue().toLocaleString(),
			filterFn: filterMinMax
		},
		{
			accessorKey: 'volume',
			header: 'Volume',
			cell: (info) => `$${parseInt(info.getValue()).toLocaleString()}`,
			filterFn: filterMinMax
		},
		{
			accessorKey: 'makers',
			header: 'Makers',
			cell: (info) => info.getValue().toLocaleString(),
			filterFn: filterMinMax
		},
		{
			accessorKey: '5m',
			header: '5m',
			cell: (info) =>
				renderComponent(TableCellAmount, { value: info.getValue(), format: (val) => `${val}%` }),
			filterFn: filterMinMax
		},
		{
			accessorKey: '1h',
			header: '1h',
			cell: (info) =>
				renderComponent(TableCellAmount, { value: info.getValue(), format: (val) => `${val}%` })
		},
		{
			accessorKey: '6h',
			header: '6h',
			cell: (info) =>
				renderComponent(TableCellAmount, { value: info.getValue(), format: (val) => `${val}%` })
		},
		{
			accessorKey: '24h',
			header: '24h',
			cell: (info) =>
				renderComponent(TableCellAmount, { value: info.getValue(), format: (val) => `${val}%` })
		},
		{
			accessorKey: 'liquidity',
			header: 'Liq',
			cell: (info) => `$${parseInt(info.getValue()).toLocaleString()}`
		},
		{
			accessorKey: 'mcap',
			header: 'MCap',
			cell: (info) => `$${parseInt(info.getValue()).toLocaleString()}`
		}
	]);

	let tableSelectedTab = $state('new');

	const client = useQueryClient();

	const testApiFun = async () => {
		const response = await fetch('https://dummyjson.com/RESOURCE/?delay=2000');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return await response.json();
	};

	const testQuery = $state(
		createQuery({
			queryKey: ['testQuery'],
			queryFn: () => testApiFun()
		})
	);

	let filterTestValue = $state('');

	let tableFilters = $state(new Map('', ''));
	let chainFilter = $state([]);

	// SORTING //
	let tableSortRef = $state();

	let tableSortState = $state({
		order: 'none',
		column: 'price'
	});

	const applyFilters = debounce(() => {
		if (tableInitialRender) {
			return;
		}
		if (tableRef) tableRef.applyFilters(tableFilters);
	}, 100);

	const applyChainFilters = debounce(() => {
		if (tableInitialRender) {
			return;
		}
		if (tableRef) tableRef.applyFilters(tableFilters.set('token', chainFilter));
	}, 100);

	const applySort = debounce(() => {
		if (tableInitialRender) {
			return;
		}
		if (tableRef && !tableInitialRender) tableRef.applySort(tableSortState);
	}, 100);

	const updateExternalSort = (column, order) => {
		tableSortState = { column: column, order: order };
		if (sortData.find((opt) => opt.value === column)) tableSortRef.changeSortColumn(column);
		applySort();
	};

	let sortData = $state([
		{
			id: 1,
			label: 'Price',
			value: 'price'
		},
		{
			id: 2,
			label: 'Trending',
			value: 'txns'
		},
		{
			id: 3,
			label: 'Liquidity',
			value: 'liquidity'
		},
		{
			id: 4,
			label: 'Volume',
			value: 'volume'
		}
	]);

	onMount(() =>
		setTimeout(() => {
			tableInitialRender = false;
		}, 250)
	);

	$effect(() => {
		if (tableSortState) applySort();
	});

	$effect(() => {
		if (chainFilter) applyChainFilters();
	});

	$effect(() => {
		if (tableFilters) applyFilters();
	});
</script>

<div bind:this={scrollObserver} class="scroll-obsvr-table p-0 m-0"></div>

<div
	class="content-container flex justify-between items-center left-0 top-0 sticky z-[10] bg-background overflow-x-auto"
	bind:this={scrollContainer1}
	use:dragToScroll
>
	<div class="flex items-center justify-between my-2.5 w-full space-x-2">
		<div class="flex items-center space-x-2">
			<Button
				className={`h-8`}
				onclick={() => {
					tableSelectedTab = 'new';
					tableSortRef.changeSortColumn('price');
					tableSortState = { column: 'price', order: 'none' };
				}}
				label="Test"
				type="third"
				active={tableSelectedTab === 'new'}><span class="text-xs md:text-sm">New</span></Button
			>
			<Button
				className={`h-8`}
				onclick={() => {
					tableSelectedTab = 'trending';
					tableSortRef.changeSortColumn('txns');
					tableSortState = { column: 'txns', order: 'desc' };
				}}
				label="Test"
				type="third"
				active={tableSelectedTab === 'trending'}
				><span class="text-xs md:text-sm">Trending</span></Button
			>
			<Button
				className={`h-8`}
				onclick={() => {
					tableSelectedTab = 'activity';
					tableSortRef.changeSortColumn('liquidity');
					tableSortState = { column: 'liquidity', order: 'desc' };
				}}
				label="Test"
				type="third"
				active={tableSelectedTab === 'activity'}
				><span class="text-xs md:text-sm">Activity</span></Button
			>
		</div>
		<MorphMenu className="flex items-center space-x-2">
			<MorphMenuItem>
				{#snippet content()}
					<TableFilter bind:filterValues={tableFilters} />
				{/snippet}
				{#snippet icon()}
					<div class="flex items-center">
						<Button className={`h-8`} label="Test" type="third" paddingY="py-0" paddingX="px-1"
							><BasilSettingsAdjustSolid class="w-6 h-6 shrink-0" /></Button
						>
					</div>
				{/snippet}
			</MorphMenuItem>
			<MorphMenuItem>
				{#snippet nontoggle()}
					<TableChain bind:chainFilter />
				{/snippet}
			</MorphMenuItem>
			<MorphMenuItem>
				{#snippet nontoggle()}
					<TableSort bind:this={tableSortRef} {sortData} bind:sortState={tableSortState} />
				{/snippet}
			</MorphMenuItem>
		</MorphMenu>
	</div>
</div>

<Table {columnDef} {rowData} bind:this={tableRef} {updateExternalSort} />
