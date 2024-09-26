<script>
	import RiTwitterXFill from '~icons/ri/twitter-x-fill';
	import RiTelegramFill from '~icons/ri/telegram-fill';

	import CoinNetwork from '$lib/theme/layout/global/crypto/CoinNetwork.svelte';

	import TableWatchlistButton from '$lib/theme/components/frontend/explore/coinboard/TableWatchlistButton.svelte';
	let { data, isWatchlist = false } = $props();

	let checked = $state(false);

	const onChange = (check) => {
		checked = check;
		console.log(checked ? 'Checked' : 'Unchecked', data.tokenSymbol);
	};
</script>

<div class="flex items-center space-x-2 md:space-x-4">
	{#if !isWatchlist}
		<div class="hidden md:flex">
			<TableWatchlistButton {checked} {onChange} />
		</div>
	{/if}

	<div class="flex items-center space-x-4">
		<CoinNetwork img={data.imgSrc || `/assets/img/sky.png`} network="" />
		<div class="space-y-1.5">
			<div
				class="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-1 flex-wrap"
			>
				<span class="text-highlight">{data.tokenSymbol || 'SKY'}</span>
				<div class="hidden md:flex">/</div>
				<span class="text-desc-token">{data.tokenName || 'Sky Raiders'}</span>
			</div>
			<div class="flex items-center space-x-2">
				<a href="http://google.com" target="_blank"
					><RiTwitterXFill class="text-highlight h-4 w-4" /></a
				>
				<a href="http://google.com" target="_blank"
					><RiTelegramFill class="text-highlight h-4 w-4" /></a
				>
			</div>
		</div>
	</div>
</div>

<style>
	:global(.text-desc-token) {
		font-weight: 400;
		color: var(--color-text);
	}
</style>
