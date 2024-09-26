<script>
	let { title, padding = false } = $props();
</script>

<div class={`${padding ? 'pb-4' : 'pb-1'}`}>
	<h2 class="text-lg md:text-xl text-highlight">{title}</h2>
</div>
