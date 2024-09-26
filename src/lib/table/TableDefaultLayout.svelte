<script>
	import { generateDummyData, generateDummyDataSingle } from '$lib/theme/components/frontend/explore/coinboard/generate.js';
	import Button from '$lib/theme/components/global/Button.svelte';
	
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
	import { onDestroy, onMount, untrack } from 'svelte';
	import TableCellAmount from '$lib/table/components/cells/TableCellAmount.svelte';
	import { debounce } from '@melt-ui/svelte/internal/helpers';
	import TableTopbar from '$lib/table/TableTopbar.svelte';
	import { getWebSocketState } from '$lib/state/websocketState.svelte.js';
	import Table from '$lib/table/Table.svelte';

	let { tableData } = $props();

	let scrollContainer1 = $state();
	let tableRef = $state();
	let tableInitialRender = $state(true);

	const filterMinMax = (row, columnId, filterValue) => {
		const value = parseFloat(row.getValue(columnId).toString());
		const min = parseFloat(filterValue.min.toString()) || Number.NEGATIVE_INFINITY;
		const max = parseFloat(filterValue.max.toString()) || Number.POSITIVE_INFINITY;
		console.log(min, filterValue.min);
		return value >= min && value <= max;
	};

	export const columnDef = $state([
		{
			accessorKey: 'token',
			header: () => $LL.token(),
			pinned: true,
			enableSorting: false,
			minWidth: 300,
			maxWidth: 4000,
			component: true,
			cell: (info) => ({ component: TableCellToken, props: { data: info.getValue() } }),
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
			component: true,
			cell: (info) => ({
				component: TableCellAmount,
				props: { value: info.getValue(), format: (val) => `${val}%` }
			}),
			filterFn: filterMinMax
		},
		{
			accessorKey: '1h',
			header: '1h',
			component: true,
			cell: (info) => ({
				component: TableCellAmount,
				props: { value: info.getValue(), format: (val) => `${val}%` }
			})
		},
		{
			accessorKey: '6h',
			header: '6h',
			component: true,
			cell: (info) => ({
				component: TableCellAmount,
				props: { value: info.getValue(), format: (val) => `${val}%` }
			})
		},
		{
			accessorKey: '24h',
			header: '24h',
			component: true,
			cell: (info) => ({
				component: TableCellAmount,
				props: { value: info.getValue(), format: (val) => `${val}%` }
			})
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

	let filterTestValue = $state('');

	let tableFilters = $state(new Map('', ''));
	let chainFilter = $state([]);

	// SORTING //
	let tableSortRef = $state();

	let tableSortState = $state({
		order: 'none',
		column: 'price'
	});

	const applyFilters = () => {
		if (tableRef) tableRef.applyFilters(tableFilters);
	};

	const applyChainFilters = () => {
		if (tableRef) tableRef.applyFilters(tableFilters.set('token', chainFilter));
	};

	const applySort = () => {
		if (tableRef) tableRef.applySort(tableSortState);
	};

	const updateExternalSort = (column, order) => {
		tableSortState = { column: column, order: order };
		if (sortData.find((opt) => opt.value === column)) tableSortRef.changeSortColumn(column);
		applySort();
	};

	const updateTableData = async () => {
		tableRef.setLoading(true);
		tableRef.updateData(generateDummyData(50));
		await sleep(1000);
		tableRef.setLoading(false);
	};

	onMount(() => {
		const interval = setInterval(() => {
			if(tableRef) tableRef.insertNewRow(generateDummyDataSingle());
		}, 1000);

		return () => {
			clearInterval(interval);
		}
	})

	// const websocketState = getWebSocketState();
	// let unsubscribeSocket = $state();

	// const handleNewRow = (data) => {
	// 	// console.log(data);
	// 	if (tableRef) tableRef.insertNewRow(data.data);
	// };

	// onMount(() => {
	// 	unsubscribeSocket = websocketState.subscribe('newrow', handleNewRow);
	// });

	// onDestroy(() => {
	// 	if (unsubscribeSocket) unsubscribeSocket();
	// });

	let sortData = $state([
		{
			id: 1,
			label: $LL.price(),
			value: 'price'
		},
		{
			id: 2,
			label: $LL.trending(),
			value: 'txns'
		},
		{
			id: 3,
			label: $LL.liqudity(),
			value: 'liquidity'
		},
		{
			id: 4,
			label: $LL.volume(),
			value: 'volume'
		}
	]);
</script>

<TableTopbar bind:this={scrollContainer1} {dragToScroll}>
	{#snippet left()}
		<Button
			className={`h-8`}
			onclick={() => {
				tableSelectedTab = 'new';
				updateTableData();
			}}
			label="Test"
			type="third"
			active={tableSelectedTab === 'new'}
			><span class="text-xs md:text-sm">{$LL.new()}</span></Button
		>
		<Button
			className={`h-8`}
			onclick={() => {
				tableSelectedTab = 'trending';
				updateTableData();
			}}
			label="Test"
			type="third"
			active={tableSelectedTab === 'trending'}
			><span class="text-xs md:text-sm">{$LL.trending()}</span></Button
		>
		<Button
			className={`h-8`}
			onclick={() => {
				tableSelectedTab = 'volume';
				updateTableData();
			}}
			label="Test"
			type="third"
			active={tableSelectedTab === 'volume'}
			><span class="text-xs md:text-sm">{$LL.volume()}</span></Button
		>
	{/snippet}
	{#snippet right(className)}
		
	{/snippet}
</TableTopbar>

<Table {columnDef} {tableData} bind:this={tableRef} {updateExternalSort} />
