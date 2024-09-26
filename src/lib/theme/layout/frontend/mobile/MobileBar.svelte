<script>
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { LL } from '$i18n/i18n-svelte';
	import { twclsx } from '$lib/utils/twclsx.js';
	import { createPathChecker } from '$lib/utils/theme.js';
	import MdiStarFourPoints from '~icons/mdi/star-four-points';
	import MdiCoinsPlus from '~icons/mdi/coins-plus';
	import MaterialSymbolsLeaderboardRounded from '~icons/material-symbols/leaderboard-rounded';
	import F7SquareFavoritesFill from '~icons/f7/square-favorites-fill';
	import MdiMenu from '~icons/mdi/menu';
	import MdiAdd from '~icons/mdi/add';
	import Badge from '$lib/theme/components/global/Badge.svelte';
	import MdiStar from '~icons/mdi/star';
	import SolarStarBold from '~icons/solar/star-bold';
	let currentPath = $state($page.url.pathname);
	let currentLocale = $state($page.data.locale);
	let isPathActive = $state(createPathChecker(currentPath, currentLocale));

	let isMenuOpen = $state(false);
	let currentContents = $state(null);
	const languageStore = getContext('languageStore');
	const sideMenu = getContext('sideMenu');

	function openMenu() {
		sideMenu.openContent('menu');
	}

	function updateState() {
		currentPath = $page.url.pathname;
		currentLocale = languageStore.language;
		isPathActive = createPathChecker(currentPath, currentLocale);

		const { open, currentContent } = sideMenu.getState();
		isMenuOpen = open;
		currentContents = currentContent;
	}

	$effect(() => {
		updateState();
	});
</script>

<div
	class="fixed left-0 bottom-0 border-t border-border py-3 w-full grid grid-cols-5 text-center sm:hidden z-[550] bg-sidebar"
>
	
</div>
