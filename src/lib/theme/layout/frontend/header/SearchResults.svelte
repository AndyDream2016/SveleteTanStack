<script>
	import { fade, fly } from 'svelte/transition';
	import { twclsx } from '$lib/utils/twclsx.js';
	import CoinNetwork from '$lib/theme/layout/global/crypto/CoinNetwork.svelte';

	let { absolute = true } = $props();

	let items = [
		{
			name: 'Sky Raiders',
			symbol: 'SKY',
			img: '/assets/img/sky.png',
			network: ''
		},
		{
			name: 'Moon Explorers',
			symbol: 'MOON',
			img: '/assets/img/moon.png',
			network: ''
		},
		{
			name: 'Sun Seekers',
			symbol: 'SUN',
			img: '/assets/img/sun.png',
			network: ''
		},
		{
			name: 'Star Navigators',
			symbol: 'STAR',
			img: '/assets/img/star.png',
			network: ''
		},
		{
			name: 'Galaxy Travelers',
			symbol: 'GALAXY',
			img: '/assets/img/galaxy.png',
			network: ''
		}
	];
</script>

<div
	class={twclsx(
		'w-full rounded-button space-y-2',
		absolute ? 'bg-inputFill absolute mt-14 transition-transform duration-300 ease-in-out p-2' : ''
	)}
	in:fly={{ y: -20, duration: 200 }}
	out:fly={{ y: -20, duration: 200 }}
>
	
</div>
