<script>
	import { getContext, onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { LL } from '$i18n/i18n-svelte';
	import { dragToScroll } from '$lib/utils/dragScroll.js';

	import LatestTrade from '$lib/theme/components/frontend/explore/LatestTrade.svelte';

	import Coinboard from '$lib/theme/components/frontend/explore/Coinboard.svelte';

	import PageSubTitle from '$lib/theme/components/frontend/page/PageSubTitle.svelte';
	import PageTableWrap from '$lib/theme/components/frontend/page/PageTableWrap.svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	let { data } = $props();

	let currentLocale = $state($page.data.locale);
	const languageStore = getContext('languageStore');

	$effect(() => {
		currentLocale = languageStore.language;
	});

	let modalConnect = $state(false);
	let items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
	const items2 = Array(2).fill(0);
	const items3 = Array(15).fill(0);
	let hoverCard = false;

	let tradeContainer = $state();

	let trades = $state([
		{
			id: 0,
			type: 'BUY',
			network: 'ethereum',
			address: '0x6d551bd441fb65513c0d815747b3409c1eb56886',
			name: 'Sky Raiders',
			pair: 'SKY / WETH',
			time: '3 seconds ago',
			amount: '0.4124 ETH',
			imageUrl: '/assets/img/sky.png',
			badgeText: 'HOT'
		}
		
	]);

	let previousLength = $state(0);

	$effect(() => {
		if (trades.length > previousLength) {
			previousLength = trades.length;
		}
	});
	let tradeId = $state(11);
	function handleNewTrade(newTrade) {
		if(!hoverCard) {
			tradeId++;
			newTrade.id = tradeId;
			// trades.unshift(newTrade);
			// trades = trades.slice(0, 21);
			trades = [newTrade, ...trades.slice(0, 20)]
			// tradeContainer.scrollTo({ left: 0, behaviour: 'smooth' });
		}
	}
	let recentBuysInterval = $state();
	onMount(() => {
		recentBuysInterval = setInterval(() => {
			handleNewTrade({
				// id: trades.length + Math.random() * 1000,
				id: 0,
				type: 'TEST',
				network: 'ethereum',
				address: '0x6d551bd441fb65513c0d815747b3409c1eb56886',
				name: 'Token',
				pair: 'TEST / WETH',
				time: '1s',
				amount: `${(Math.random() * 100).toFixed(6)} ETH`,
				imageUrl: '/assets/img/sky.png',
				badgeText: 'HOT'
			});
		}, 3000);
	});

	onDestroy(() => {
		clearInterval(recentBuysInterval);
	});

	let tradesDragging = $state(false);

	$effect(() => {
		console.log(tradesDragging);
	});
</script>

<PageTableWrap>
	<PageSubTitle title={$LL.recentbuys()} />

	<div class="overflow-hidden relative -mr-4 -ml-4 md:-mr-6 md:-ml-6 pb-2.5">
		<div
			class="flex overflow-x-auto no-scrollbar snap-x md:snap-none space-x-4 snap-mandatory px-4 md:px-6"
			bind:this={tradeContainer}
			use:dragToScroll
		>
			{#if trades.length > 0}
				{#each trades as trade (trade.id)}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="w-[280px] snap-center"
						animate:flip={{ duration: 300 }}
						in:fly={{ x: -100, duration: 300 }}
						out:fly={{ x: 100, duration: 300 }}
						onmouseenter={
							() => { hoverCard = true }
						}
						onmouseleave={
							() => { hoverCard = false }
						}
					>
						<LatestTrade
							type={trade.type}
							address={trade.address}
							network={trade.network}
							name={`${trade.name} ${trade.id}`}
							pair={trade.pair}
							time={trade.time}
							amount={trade.amount}
							imageUrl={trade.imageUrl}
							badgeText={trade.badgeText}
							badgeVisible={true}
							disabled={tradesDragging}
						/>
					</div>
				{/each}
			{:else}
				<div class="pb-4 text-xs md:text-sm">{$LL.notokensyet()}</div>
			{/if}
			<div
				class="scroll-drag-cover hidden z-100 absolute w-full h-full top-0 left-0 cursor-grabbing"
			></div>
		</div>
	</div>
	<PageSubTitle title={$LL.coinboard()} />
</PageTableWrap>

<Coinboard tableData={data.tableData.data} />
