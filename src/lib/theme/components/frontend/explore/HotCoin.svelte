<script>
	import { twclsx } from '$lib/utils/twclsx.js';
	import BxsBadge from '~icons/bxs/badge';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import CoinNetwork from '$lib/theme/layout/global/crypto/CoinNetwork.svelte';
	let { number, network, address, name, pair, imageUrl, badgeText, badgeVisible = true } = $props();
	let textColorClass = $state();
	let bgColorClass = $state();
	let modalColorClass = $state();
	$effect.pre(() => {
		textColorClass =
			number === 1
				? 'text-gold text-black'
				: number === 2
					? 'text-silver'
					: number === 3
						? 'text-bronze'
						: 'text-black';
		bgColorClass =
			number === 1
				? 'bg-gold'
				: number === 2
					? 'bg-silver'
					: number === 3
						? 'bg-bronze'
						: 'bg-active !text-invert';
		modalColorClass =
			number === 1
				? 'border-1 border-gold'
				: number === 2
					? 'border-1 border-silver'
					: number === 3
						? 'border-1 border-bronze'
						: '';
	});

	let currentLocale = $state($page.data.locale);
	const languageStore = getContext('languageStore');

	function updateState() {
		currentLocale = languageStore.language;
	}

	$effect(() => {
		updateState();
	});
</script>

<a
	class="flex-none w-[260px] transition-transform duration-200 transform hover:scale-102 snap-start"
	style="scroll-snap-align: center;"
	href={`/${currentLocale}/token/${network}/${address}`}
>
	<div class={twclsx('flex bg-card rounded-2xl shadow-md', modalColorClass)}>
		<div class="flex flex-col w-full">
			<div class="relative flex items-center space-x-4 px-3 py-1.5">
				<CoinNetwork img={`/assets/img/sky.png`} network="" />
				<div class="flex flex-col space-y-1.5 items-start">
					<div class="text-highlight">{name}</div>
					<span class="text-xs">{pair}</span>
				</div>
				{#if badgeVisible}
					<span
						class="absolute top-2.5 -right-1 text-invert text-xxs bg-primary px-1.5 py-0.5 rounded-full font-semibold"
						>{badgeText}</span
					>
				{/if}
				<span class="absolute bottom-2.5 right-3 text-primary text-xxs rounded-full font-semibold"
					>%7</span
				>
			</div>
		</div>
	</div>
</a>
