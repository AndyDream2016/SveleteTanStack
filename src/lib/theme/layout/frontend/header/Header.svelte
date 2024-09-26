<script>
	import { getContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	import { page } from '$app/stores';
	import { twclsx } from '$lib/utils/twclsx.js';
	import { LL } from '$i18n/i18n-svelte';

	import Symbol from '$lib/theme/layout/global/ui/Symbol.svelte';
	import Logo from '$lib/theme/layout/global/ui/Logo.svelte';
	import LogoCol from '$lib/theme/layout/global/ui/LogoCol.svelte';

	import TablerLayoutSidebarFilled from '~icons/tabler/layout-sidebar-filled';
	import MdiSettings from '~icons/mdi/settings';

	import IconButton from '$lib/theme/components/global/IconButton.svelte';
	import MdiAdd from '~icons/mdi/add';
	import MdiMenu from '~icons/mdi/menu';
	import MdiChat from '~icons/mdi/chat';
	import IonSearch from '~icons/ion/search';

	import { getBackdropContext } from '$lib/components/global/backdrop/context';
	import { nanoid } from 'nanoid';

	import ConnectWallet from '$lib/theme/components/global/ConnectWallet.svelte';

	import SearchResults from '$lib/theme/layout/frontend/header/SearchResults.svelte';
	import { getWebSocketState } from '$lib/state/websocketState.svelte.js';

	const backdrop_context = getBackdropContext();
	const id = nanoid(); // Generate a unique ID for the component

	let { className } = $props();

	let isMenuOpen = $state(false);
	let activeContent = $state('');

	const sidebarStore = getContext('sidebarStore');
	const themeStore = getContext('themeStore');
	const languageStore = getContext('languageStore');
	const sideMenu = getContext('sideMenu');
	const websocketState = getWebSocketState();

</script>

<div class="bg-primary text-invert text-center p-3 text-sm h-8 flex items-center justify-center">
	{$LL.sitemaintenance()}
	{websocketState.status ? 'WS Connected' : 'WS Disconnected'}
</div>