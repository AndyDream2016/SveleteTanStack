<script>
	import {
		createTable,
		getCoreRowModel,
		getFilteredRowModel,
		getSortedRowModel,
		getFacetedRowModel,
		tableOptions,
		FlexRender
	} from '@tanstack/svelte-table';
	import { browser } from '$app/environment';
	import PrimeSortUpFill from '~icons/prime/sort-up-fill';
	import PrimeSortDownFill from '~icons/prime/sort-down-fill';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fly, slide } from 'svelte/transition';

	import { generateDummyDataSingle } from '$lib/theme/components/frontend/explore/coinboard/generate.js';
	import TableLoader from './components/TableLoader.svelte';
	import { LL } from '$i18n/i18n-svelte';
	let {
		columnDef,
		tableData = [],
		notFound = $LL.notokensyet(),
		minWidth = 100,
		maxWidth = 500,
		updateExternalSort
	} = $props();

	let isLoading = $state(false);

	let data = $state([...tableData]);
	let isSmallerScreen = $state(browser && window.innerWidth <= 768);

	let gridHeaderLayout = $state();
	let tableBody = $state();

	let sorting = $state([]);
	let filters = $state([]);

	const options = $state(
		tableOptions({
			get data() {
				return data;
			},
			columns: columnDef,
			state: {
				get sorting() {
					return sorting;
				},
				get columnFilters() {
					return filters;
				}
			},
			onSortingChange: (updater) => {
				if (typeof updater === 'function') {
					sorting = updater(sorting);
				} else {
					sorting = updater;
				}
			},
			onColumnFiltersChange: (updater) => {
				if (typeof updater === 'function') {
					filters = updater(filters);
				} else {
					filters = updater;
				}
			},
			getCoreRowModel: getCoreRowModel(),
			getFilteredRowModel: getFilteredRowModel(),
			getSortedRowModel: getSortedRowModel(),
			getFacetedRowModel: getFacetedRowModel()
		})
	);

	const table = $state(createTable(options));
	let headerTopOffset = $state(50);

	let rowModel = $state(table.getRowModel());

	let isAnimatingRow = $state(false);
	let animateInsertRow = $state(false);
	let animateDeleteRow = $state(false);

	export const updateData = (newData) => {
		data = [...newData];
	};

	export const setLoading = (state) => {
		isLoading = state;
	};

	export const insertNewRow = (rowData) => {
		if (isAnimatingRow) return;
		animateInsertRow = true;
		isAnimatingRow = true;

		// document.getElementById('coinkick-main-layout').scrollTo({ top: 0, behavior: 'smooth' });
		data = [rowData, ...data.slice(0, 9)];

		// let tempData = Array.from(data).slice(0, 9)
		// data = [rowData, ...Array.from(tempData)]

		setTimeout(() => {
			animateInsertRow = false;
			isAnimatingRow = false;
		}, 500);
	};

	// export const deleteRow = (index = 0) => {
	// 	animateDeleteRow = true;
	// 	data = data.filter((d, i) => i !== index);
	// 	console.log(data.length);
	// 	rowModel = table.getRowModel();
	// 	setTimeout(() => {
	// 		animateDeleteRow = false;
	// 	}, 500);
	// };

	function getTransition(index) {
		if (!animateInsertRow && !animateDeleteRow) return {};
		let direction = animateInsertRow ? -1 : 1;
		if (index === 0) {
			return { y: 50 * direction, duration: 300, opacity: 0 };
		} else {
			return { y: 50 * direction, duration: 300, opacity: 1 };
		}
	}

	export const applySort = (state) => {
		if (state.column === '') {
			table.setSorting([]);
			return;
		}
		const column = table.getColumn(state.column);
		if (column) {
			if (state.order === 'none') {
				table.setSorting([]);
			} else {
				column.toggleSorting(state.order === 'desc');
			}
		}
	};

	export const applyFilters = (filterList) => {
		filters = mapToArray(filterList);
		console.log($state.snapshot(filters));
	};

	const mapToArray = (map) => {
		return Array.from(map, ([key, value]) => ({ id: key, value: value }));
	};

	let tableGridLayout = $state(
		columnDef
			.map(
				(column) =>
					`minmax(${column.minWidth * (isSmallerScreen ? 0.6 : 1) || minWidth}px, ${column.maxWidth || maxWidth}px)`
			)
			.join(' ')
	);

	$effect(() => {
		if (sorting || filters || data) {
			rowModel = table.getRowModel();
		}
	});

	const resizeHandler = () => {
		if (window.innerWidth <= 768 && !isSmallerScreen) isSmallerScreen = true;
		if (window.innerWidth > 768 && isSmallerScreen) isSmallerScreen = false;
	};
	onMount(() => {
		window.addEventListener('resize', resizeHandler);

		return () => {
			window.removeEventListener('resize', resizeHandler);
		};
	});

	$effect(() => {
		console.log('change');

		tableGridLayout = columnDef
			.map(
				(column) =>
					`minmax(${column.minWidth * (isSmallerScreen ? 0.6 : 1) || minWidth}px, ${column.maxWidth || maxWidth}px)`
			)
			.join(' ');
	});
</script>

<div class="coinkick-table select-none flex text-xs md:text-sm w-full">
	<div class="coinkick-table-root sticky top-0 flex flex-col">
		<div
			class={`relative coinkick-table-header grid border-b-2 border-border sticky top-[52px] z-10 lg:rounded-t-md`}
			style:grid-template-columns={`${tableGridLayout}`}
			bind:this={gridHeaderLayout}
		>
			{#each table.getHeaderGroups() as headerGroup, ind (ind)}
				{#each headerGroup.headers as header, index (index)}
					<div
						class="coinkick-table-header-cell border-b border-borderLight bg-card px-4 h-10 flex items-center grow-1"
						class:sticky={header.column.columnDef.pinned}
						class:left-0={header.column.columnDef.pinned}
						class:z-10={header.column.columnDef.pinned}
						style:top={`${headerTopOffset}px`}
						style:left={`${header.column.columnDef.leftOffset || 0}px`}
						class:justify-end={index !== 0}
						class:border-r={index !== headerGroup.headers.length - 1}
					>
						{#if !header.isPlaceholder}
							{#if header.column.getCanSort()}
								<button
									class="flex gap-2"
									onclick={() => {
										console.log(sorting[0]);
										if (sorting[0] && sorting[0].id === header.column.columnDef.accessorKey) {
											updateExternalSort(
												header.column.columnDef.accessorKey,
												sorting[0] ? (sorting[0].desc ? 'asc' : 'none') : 'desc'
											);
										} else {
											updateExternalSort(header.column.columnDef.accessorKey, 'desc');
										}
									}}
								>
									{#if typeof header.column.columnDef.header === 'function'}
										{header.column.columnDef.header()}
									{:else}
										{header.column.columnDef.header}
									{/if}

									{#if header.column.getIsSorted().toString() === 'asc'}
										<PrimeSortUpFill />
									{:else if header.column.getIsSorted().toString() === 'desc'}
										<PrimeSortDownFill />
									{/if}
								</button>
							{:else if typeof header.column.columnDef.header === 'function'}
								{header.column.columnDef.header()}
							{:else}
								{header.column.columnDef.header}
							{/if}
						{/if}
					</div>
				{/each}
			{/each}
		</div>
		<div
			class={`relative flex-grow coinkick-table-body ${rowModel.rows.length === 0 && 'h-[calc(100vh-359px)] sm:h-[calc(100vh-301px)] md:h-[calc(100vh-319px)]'}`}
			bind:this={tableBody}
		>
			{#if isLoading}
				<TableLoader gridLayout={tableGridLayout} columns={columnDef.length} />
			{:else if rowModel.rows.length === 0}
				<div class={`size-full min-h-full max-w-[100vw] lg:max-w-[calc(100vw-256px)] bg-card p-4`}>
					<div
						class="text-center p-4 border border-dashed min-h-full rounded-button text-xl flex items-center justify-center"
					>
						<span class="text-highlight">{notFound}</span>
					</div>
				</div>
			{:else}
				{#each rowModel.rows as row, rowIndex (row.original.id)}
					<div
						class={`coinkick-table-row grid group`}
						style:grid-template-columns={tableGridLayout}
						animate:flip={{ duration: 300 }}
						in:fly={getTransition(rowIndex)}
						out:slide={{ duration: 300 }}
					>
						<!-- Maybe only this:
					in:fly="{{ y: rowIndex === 0 && animateInsertRow ? 50 : 0, duration: 300 }}" -->
						{#each row.getVisibleCells() as cell, cellIndex (cellIndex)}
							<div
								class="coinkick-table-cell p-3 flex items-center border-b border-borderLight grow-1 group-hover:bg-modal"
								class:pinned={cell.column.columnDef.pinned}
								class:bg-background={cell.column.columnDef.pinned}
								class:border-b-0={rowIndex === rowModel.rows.length - 1}
								class:lg:rounded-bl-md={rowIndex === rowModel.rows.length - 1 && cellIndex === 0}
								class:lg:rounded-br-md={rowIndex === rowModel.rows.length - 1 &&
									cellIndex === row.getVisibleCells().length - 1}
								class:border-r={cellIndex !== row.getVisibleCells().length - 1}
								style:left={`${cell.column.columnDef.leftOffset || 0}px`}
								class:justify-end={cellIndex !== 0}
							>
								{#if cell.column.columnDef.component}
									{@const { component: CustomComponent, props } = cell.column.columnDef.cell(
										cell.getContext()
									)}
									<CustomComponent {...props} />
								{:else}
									{cell.getValue()}
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.pinned {
		position: sticky;
		left: 0;
		z-index: 5;
	}
	/* .coinkick-table-header,
	.coinkick-table-row {
		grid-template-columns: repeat(12, minmax(120px, 300px));
	} */
</style>
