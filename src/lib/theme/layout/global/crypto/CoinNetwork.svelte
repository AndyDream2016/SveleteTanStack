<script>
	import Ethereum from '$assets/icons/Ethereum.svelte';
	let { img, chain } = $props();
</script>

<div
	class="relative md:h-10 md:w-10 w-9 h-9 bg-blue-400 rounded-full flex items-center justify-center"
>
	<div class="md:h-9 md:w-9 h-8 w-8 bg-white rounded-full border-2 border-black">
		<img src={img} alt="" class="w-7 h-7 md:h-8 md:w-8 rounded-full" />
	</div>
	<div class="absolute bg-white p-0.5 rounded-full -bottom-0.5 -right-2 border-2 border-modal">
		<Ethereum class="w-3 h-3 md:w-4 md:h-4" />
	</div>
</div>
