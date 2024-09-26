<script>
	import { page } from '$app/stores';
	import { getContext } from 'svelte';

	import Fa6SolidShrimp from '~icons/fa6-solid/shrimp';
	import Ethereum from '$assets/icons/Ethereum.svelte';
	import CoinNetwork from '$lib/theme/layout/global/crypto/CoinNetwork.svelte';
	let {
		disabled = false,
		address,
		network,
		name,
		pair,
		type,
		time,
		amount,
		imageUrl,
		badgeText,
		badgeVisible = true
	} = $props();

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
	class="flex-none w-[280px] transition-transform duration-200 transform hover:scale-105 snap-start"
	style="scroll-snap-align: center;"
	href={`/${currentLocale}/token/${network}/${address}`}
	aria-disabled={disabled}
>
	<div class="flex bg-card rounded-2xl shadow-md">
		<div class="flex flex-col w-full">
			<div class="relative flex items-center space-x-4 px-3 py-3">
				<CoinNetwork img={`/assets/img/sky.png`} network="" />
				<div class="flex flex-col space-y-1.5">
					<div class="text-highlight truncate w-[150px]">{name}</div>
					<span class="text-xs truncate w-[200px]">{pair}</span>
				</div>
				<span
					class="absolute top-3 right-3 text-xxs text-invert bg-primary px-1.5 py-0.5 rounded-full font-semibold"
					>{type}</span
				>
			</div>
			<hr class="border-border" />
			<div class="flex flex-col space-x-2 px-3 py-2 md:py-3">
				<div class="flex flex-col space-y-1">
					<div class="flex items-center space-x-2">
						<Fa6SolidShrimp class="h-5 w-5 text-orange-400 shrink-0" />
						<div class="flex justify-between w-full items-center">
							<span class="text-sm font-semibold text-highlight">{amount}</span>
							<span class="text-xs">{time}</span>
						</div>
					</div>
				</div>

				<div class="text-center">
					<span class="text-highlight"></span>
				</div>
			</div>
		</div>
	</div>
</a>
