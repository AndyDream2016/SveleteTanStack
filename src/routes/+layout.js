import { redirect } from '@sveltejs/kit';

import { baseLocale, locales } from '$i18n/i18n-util';
import { loadLocaleAsync } from '$i18n/i18n-util.async';

const replaceLocaleInUrl = (url, locale) => {
	const pathParts = url.pathname.split('/').filter(Boolean);
	const firstPartIsLocale = locales.includes(pathParts[0]);

	let newPathname;
	if (firstPartIsLocale) {
		// Replace existing locale with the new locale
		pathParts[0] = locale;
		newPathname = `/${pathParts.join('/')}`;
	} else {
		// Add the base locale to the URL
		newPathname = `/${locale}/${pathParts.join('/')}`;
	}

	return `${newPathname}${url.search}`;
};

export const load = async ({ data, locals, url, params }) => {
	const lang = params.lang || url.pathname.split('/')[1];

	// redirect to base locale if language is not present
	//const language = cookies.get('theme');
	if (!locales.includes(lang)) {
		// If the first part of the path is not a locale, assume it's a non-localized URL
		// Redirect to the same URL with the base locale added
		throw redirect(302, replaceLocaleInUrl(url, data.locale || baseLocale));
	}

	await loadLocaleAsync(lang);
	return {
		locale: data.locale,
		firstPath: data.firstPath,
		themeMode: data.themeMode,
		sidebarCollapse: data.sidebarCollapse,
		isMobile: data.isMobile
	};
};
