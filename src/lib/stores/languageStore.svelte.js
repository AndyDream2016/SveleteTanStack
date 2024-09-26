import { getCookie, setCookie } from '$lib/utils/cookie.js';
import { goto } from '$app/navigation';
import { setLocale } from '$i18n/i18n-svelte';
import { loadLocaleAsync } from '$i18n/i18n-util.async';

const languageMap = {
	en: 'English',
	de: 'Deutsch',
	ar: 'العربية',
	es: 'Español',
	hi: 'हिंदी',
	id: 'Bahasa Indonesia',
	ja: '日本語',
	nl: 'Nederlands',
	pl: 'Polski',
	pt: 'Português',
	ru: 'Русский',
	th: 'ไทย',
	tr: 'Türkçe',
	uk: 'Українська',
	vi: 'Tiếng Việt',
	zh: '中文'
};

// Encapsulate the language store logic
export function createLanguageStore() {
	// Declare reactive state using $state
	let language = $state(getInitialLang());

	// Get initial language from cookies or default to 'en'
	function getInitialLang() {
		return getCookie('lang') || 'en';
	}

	// Handle side effects for cookie updates with $effect
	$effect(() => {
		if (typeof window !== 'undefined') {
			setCookie('lang', language);
		}
	});

	// Function to change language
	async function changeLanguage(newLang) {
		// Get the current pathname and query string
		const currentPath = window.location.pathname.split('/').slice(2).join('/');
		const currentQueryString = window.location.search;

		// Construct the new URL with the new language, existing path, and query string
		const newUrl = `/${newLang}/${currentPath}${currentQueryString}`;

		goto(newUrl);

		await loadLocaleAsync(newLang);
		setLocale(newLang);

		language = newLang; // Update the reactive state directly
	}

	// Return reactive state and change function with getters
	return {
		get language() {
			return language;
		},
		get languageText() {
			return languageMap[language] || 'Unknown Language'; // Return the full text
		},
		changeLanguage
	};
}
