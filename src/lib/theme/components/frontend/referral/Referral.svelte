<script>
	import { LL } from '$i18n/i18n-svelte';
	import Table from '$lib/table/Table.svelte';
	import Button from '$lib/theme/components/global/Button.svelte';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import Tooltip from '$lib/melt/Tooltip.svelte';
	import { dragToScroll } from '$lib/utils/dragScroll.js';
	import { untrack } from 'svelte';

	let scrollContainer1 = $state();
	let tableRef = $state();

	let scrollObserver = $state();

	const rowData = $state();

	export const columnDef = $state([
		{
			accessorKey: 'place',
			header: $LL.place(),
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'user',
			header: $LL.user(),
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'points',
			header: $LL.points(),
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'prize',
			header: $LL.prize(),
			cell: (info) => info.getValue()
		}
	]);

	let tableSelectedTab = $state('new');

	let minWidth = $state(50);
	let maxWidth = $state(3000);
</script>

<div bind:this={scrollObserver} class="scroll-obsvr-table p-0 m-0"></div>

<Table
	{columnDef}
	{rowData}
	bind:this={tableRef}
	{minWidth}
	{maxWidth}
	notFound={$LL.loginfirst()}
/>
