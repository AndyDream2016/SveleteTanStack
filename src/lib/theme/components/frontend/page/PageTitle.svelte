<script>
	let { title, center = false, padding = false } = $props();
</script>

<div class={`${center ? 'text-center' : 'text-left'} ${padding ? 'pb-6 md:pb-12' : ''}`}>
	<h1 class="text-2xl sm:text-3xl lg:text-3xl text-highlight">{title}</h1>
</div>
