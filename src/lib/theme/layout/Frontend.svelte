<script>
	import { page } from '$app/stores';
	import { spring } from 'svelte/motion';

	import { onMount, setContext, tick } from 'svelte';
	import { createSidebarStore } from '$lib/theme/layout/frontend/store/createSidebarStore.svelte.js';
	import { createThemeStore } from '$lib/theme/layout/frontend/store/createThemeStore.svelte.js';
	import { createLanguageStore } from '$lib/stores/languageStore.svelte.js';

	import TopLeaderboard from '$lib/theme/components/frontend/page/TopLeaderboard.svelte';

	import WebsocketsProvider from '$lib/providers/WebsocketsProvider.svelte';

	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	import { settings } from '$lib/settings.js';

	let { children } = $props();

	let sidebarCollapse = $state(JSON.parse($page.data.sidebarCollapse));
	let isMobile = $state(JSON.parse($page.data.isMobile));
	let marginLeft = $state(0);
	let currentPath = $state($page.url.pathname);
	const sidebarStore = createSidebarStore(sidebarCollapse, isMobile);
	const themeStore = createThemeStore($page.data.themeMode);
	const languageStore = createLanguageStore();

	setContext('sidebarStore', sidebarStore);
	setContext('themeStore', themeStore);
	setContext('languageStore', languageStore);

	let sidebarWidth = sidebarStore.sidebarWidth;

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
	$effect(() => {
		currentPath = $page.url.pathname;
	});
</script>

<QueryClientProvider client={queryClient}>
	
		<WebsocketsProvider>
			<div class="fixed h-dvh w-screen flex overflow-y-hidden top-0">
			
					

					<div
						id="coinkick-main-layout"
						class="h-[calc(100%-65px)] sm:h-full block overflow-auto overscroll-none touch-manipulation"
					
					>
						<div class="sticky left-0 z-[40]">
							

							<TopLeaderboard />
						</div>

						{@render children()}

					</div>

				
			
			</div>
		</WebsocketsProvider>

</QueryClientProvider>
