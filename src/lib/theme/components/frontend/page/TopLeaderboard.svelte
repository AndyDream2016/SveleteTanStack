<script>
	import { LL } from '$i18n/i18n-svelte';
	import Marqueeck from '@arisbh/marqueeck';
	import HotCoin from '$lib/theme/components/frontend/explore/HotCoin.svelte';
	import { onMount } from 'svelte';
	import LineMdDownloadingLoop from '~icons/line-md/downloading-loop';
	let play = $state(true);
	let isLoading = $state(true);
	function handleUnfocus(event) {
		setTimeout(() => {
			play = true;
		}, 100);
	}
	const coins = [
		{
			number: 10,
			network: 'ethereum',
			address: '0x0',
			name: 'DogeForever',
			pair: 'DOGEFOREVER / USDT',
			imageUrl: '/assets/img/forever.jpg',
			badgeText: 'HOT'
		},
		{
			number: 1,
			network: 'ethereum',
			address: '0x0',
			name: 'DogeForever',
			pair: 'DOGEFOREVER / USDT',
			imageUrl: '/assets/img/forever.jpg',
			badgeText: 'HOT'
		},
		{
			number: 3,
			network: 'ethereum',
			address: '0x0',
			name: 'DogeForever',
			pair: 'DOGEFOREVER / USDT',
			imageUrl: '/assets/img/forever.jpg',
			badgeText: 'HOT'
		},
		{
			number: 5,
			network: 'ethereum',
			address: '0x0',
			name: 'DogeForever',
			pair: 'DOGEFOREVER / USDT',
			imageUrl: '/assets/img/forever.jpg',
			badgeText: 'HOT'
		},
		{
			number: 110,
			network: 'ethereum',
			address: '0x0',
			name: 'DogeForever',
			pair: 'DOGEFOREVER / USDT',
			imageUrl: '/assets/img/forever.jpg',
			badgeText: 'HOT'
		},
		{
			number: 210,
			network: 'ethereum',
			address: '0x0',
			name: 'DogeForever',
			pair: 'DOGEFOREVER / USDT',
			imageUrl: '/assets/img/forever.jpg',
			badgeText: 'HOT'
		},
		{
			number: 310,
			network: 'ethereum',
			address: '0x0',
			name: 'DogeForever',
			pair: 'DOGEFOREVER / USDT',
			imageUrl: '/assets/img/forever.jpg',
			badgeText: 'HOT'
		},
		{
			number: 410,
			network: 'ethereum',
			address: '0x0',
			name: 'DogeForever',
			pair: 'DOGEFOREVER / USDT',
			imageUrl: '/assets/img/forever.jpg',
			badgeText: 'HOT'
		},
		
	];
	onMount(() => {
		isLoading = false;
	});
</script>

<div class="leaderboard touch-none relative border-b border-border flex items-center">
	{#if isLoading}
		<div role="status" class="animate-pulse ml-2 flex space-x-2 overflow-hidden">
			{#each Array(20) as _}
				<div class="flex items-center bg-card h-[48px] md:h-[54px] px-2 rounded-button w-[200px]">
					<LineMdDownloadingLoop class="text-text me-2 w-12 h-12" />
					<div class="flex flex-col space-y-2">
						<div class="w-[150px] h-1.5 bg-text rounded-full"></div>
						<div class="w-20 h-1 bg-text rounded-full"></div>
					</div>
				</div>
			{/each}
			<span class="sr-only">Loading...</span>
		</div>
	{:else if coins.length > 0}
		<Marqueeck
			--marqueeck-x-pad="0"
			class="padding-0 margin-0"
			options={{ direction: 'left', speed: 100, brakeDuration: 500, childTransition: 'none' }}
		>
			<button class="flex space-x-2 no-scrollbar" onclick={handleUnfocus}>
				{#each coins as coin}
					<HotCoin
						number={coin.number}
						address={coin.address}
						network={coin.network}
						name={coin.name}
						pair={coin.pair}
						imageUrl={coin.imageUrl}
						badgeText={coin.badgeText}
						badgeVisible={true}
					/>
				{/each}
			</button>
		</Marqueeck>
	{:else}
		<div class="text-center text-xs md:text-sm w-full">
			{$LL.notokensyet()}
		</div>
	{/if}
</div>

<style>
	:global(:root) {
		--marqueeck-x-pad: 0;
	}
	:global([data-marqueeck-wrapper]) {
		padding-inline: 0;
		padding-block: 0;
	}
</style>
