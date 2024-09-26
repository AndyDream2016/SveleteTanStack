<script>
	let { title, padding = false } = $props();
</script>

<div class={`${padding && 'pb-4'}`}>
	<h3 class="text-lg md:text-xl text-highlight">{title}</h3>
</div>
