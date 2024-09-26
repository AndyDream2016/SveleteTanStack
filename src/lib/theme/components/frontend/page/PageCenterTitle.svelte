<script>
	let { className, title, padding = false } = $props();
</script>

<div class={`text-center ${padding ? 'pb-4' : 'pb-2'} ${className}`}>
	<h2 class="text-lg md:text-2xl">{title}</h2>
</div>
