<script>
	let { children, left, right, scrollContainer1, dragToScroll } = $props();
	let className = 'flex items-center space-x-2';
</script>

<div
	class="content-container flex justify-between items-center left-0 top-0 sticky z-[10] bg-background overflow-x-auto"
	bind:this={scrollContainer1}
	use:dragToScroll
>
	<div class="flex items-center justify-between my-2.5 w-full space-x-2">
		<div class="flex items-center space-x-2">
			{@render left()}
		</div>
		{#if right}
			{@render right(className)}
		{/if}
	</div>
</div>
