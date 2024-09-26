<script>
	let { children, padding = true, className, classChild } = $props();
</script>

<div class={`content-container left-0 sticky ${padding ? 'pt-4 pb-10' : ''} ${className}`}>
	<div class={`flex flex-col space-y-pageMobile md:space-y-page ${classChild}`}>
		{@render children()}
	</div>
</div>
