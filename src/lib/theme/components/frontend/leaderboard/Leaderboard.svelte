<script>
	import { LL } from '$i18n/i18n-svelte';
	import Table from '$lib/table/Table.svelte';
	import Button from '$lib/theme/components/global/Button.svelte';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import Tooltip from '$lib/melt/Tooltip.svelte';
	import { dragToScroll } from '$lib/utils/dragScroll.js';
	import { untrack } from 'svelte';
	import { generateDummyData } from '$lib/theme/components/frontend/leaderboard/generate.js';
	import TableTopbar from '$lib/table/TableTopbar.svelte';
	let scrollContainer1 = $state();
	let tableRef = $state();

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

<TableTopbar bind:this={scrollContainer1} {dragToScroll}>
	{#snippet left()}
		<Button
			className={`h-8`}
			onclick={() => {
				tableSelectedTab = 'new';
			}}
			label="Test"
			type="third"
			active={tableSelectedTab === 'new'}
			><span class="text-xs md:text-sm">{$LL.current()}</span></Button
		>
		<Button
			className={`h-8`}
			onclick={() => {
				tableSelectedTab = 'trending';
			}}
			label="Test"
			type="third"
			active={tableSelectedTab === 'trending'}
			><span class="text-xs md:text-sm">{$LL.previous()}</span></Button
		>
	{/snippet}
</TableTopbar>

<Table
	{columnDef}
	{rowData}
	bind:this={tableRef}
	{minWidth}
	{maxWidth}
	notFound={$LL.norankingsyet()}
/>
