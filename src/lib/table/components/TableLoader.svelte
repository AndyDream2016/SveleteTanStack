<script>
	let { gridLayout, columns = 5, lines = 10 } = $props();
</script>

<div role="status" class="divide-gray-200 shadow animate-pulse dark:divide-gray-700">
	{#each Array(lines) as _, i (i)}
		<div class="grid py-3 items-center border border-t-0" style:grid-template-columns={gridLayout}>
			<div class="px-3 sticky left-0 bg-background">
				<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
				<div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
			</div>
			{#each Array(columns - 1) as __, ii (ii)}
				<div
					class="justify-self-end mx-3 h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"
				></div>
			{/each}
		</div>
	{/each}
	<span class="sr-only">Loading...</span>
</div>
