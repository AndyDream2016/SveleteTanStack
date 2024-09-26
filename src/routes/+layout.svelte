<script>
	import './../assets/css/main.scss';
	import '@fontsource-variable/inter';

	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import toast, { Toaster } from 'svelte-french-toast';

	import { setLocale } from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';

	const { children, data } = $props();

	const defaultMeta = {
		title: 'Coinkick - Launch like a pro, trade like a legend',
		description:
			'Launch, trade, and connect—your all-in-one platform for anti-rug crypto projects.',
		ogImageUrl: '/og.jpg'
	};

	let title = $derived($page.data.meta?.title ? `${$page.data.meta.title}` : defaultMeta.title);
	let description = $derived(
		$page.data.meta?.description ? $page.data.meta.description : defaultMeta.description
	);
	let ogImageUrl = $derived(
		`${$page.url.origin}${
			$page.data.meta?.ogImageUrl ? $page.data.meta.ogImageUrl : defaultMeta.ogImageUrl
		}`
	);

	setLocale($page.data.locale);

</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content="index, follow" />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Coinkick" />
	<meta property="og:url" content={$page.url.href} />

	<meta property="og:image" content={ogImageUrl} />
	<meta name="twitter:card" content="summary_large_image" />

	<meta name="theme-color" content="#000000" />

	<link rel="canonical" href={$page.url.href} />

</svelte:head>

		<Toaster />
		{@render children()}
