<script>
	let { children } = $props();
</script>

<div class="content-container pt-4 left-0 sticky">
	<div class="flex flex-col space-y-pageMobile md:space-y-page">
		{@render children()}
	</div>
</div>
