import { redirect } from '@sveltejs/kit';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { setLocale } from '$i18n/i18n-svelte';
import { detectLocale } from '$i18n/i18n-util';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { locales } from '$i18n/i18n-util';

export const handle = async ({ event, resolve }) => {
	const pathLocale = event.url.pathname.split('/')[1]; // Get the first segment of the path
	const cookieLocale = event.cookies.get('lang'); // Get the locale from the cookie
	let locale;
	const acceptLanguageHeaderDetector = initAcceptLanguageHeaderDetector(event.request);
	console.log('wtf');
	console.log('lang det', detectLocale(acceptLanguageHeaderDetector));
	// Check if the path includes a valid locale
	if (locales.includes(pathLocale)) {
		// If path locale is present and valid, use it
		locale = pathLocale;

		// Update the cookie to match the path locale if different
		if (locale !== cookieLocale) {
			event.cookies.set('lang', locale, {
				path: '/',
				httpOnly: false,
				sameSite: 'lax'
			});
		}
	} else {
		// No valid locale in the path, check the cookie
		if (cookieLocale && locales.includes(cookieLocale)) {
			// Use the cookie locale if available and valid
			locale = cookieLocale;

			// Redirect to the locale-specific path if not already there
			// if (!locales.includes(pathLocale)) {
			// 	// Redirect to the path with the locale
			// 	console.log('this hits 2');
			// 	throw redirect(307, `/${locale}${event.url.pathname}`);
			// }
		} else {
			// Fallback to detecting from browser or use 'en' as default
			const acceptLanguageHeaderDetector = initAcceptLanguageHeaderDetector(event.request);
			locale = detectLocale(acceptLanguageHeaderDetector) || 'en';

			// Set the detected locale in the cookie
			event.cookies.set('lang', locale, {
				path: '/',
				httpOnly: false,
				sameSite: 'lax'
			});

			// Redirect to the path with the detected or default locale
			// if (!event.url.pathname.startsWith(`/${locale}`)) {
			// 	console.log('this hits');
			// 	throw redirect(307, `/${locale}${event.url.pathname}`);
			// }
		}
	}

	// Load and set the locale
	await loadLocaleAsync(locale);
	setLocale(locale);
	event.locals.locale = locale;

	const response = await resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace(/<html(.*?)lang=".*?"(.*?)>/, `<html$1lang="${locale}"$2>`)
	});
	response.headers.set('cache-control', 'no-cache');

	return response;
};

// // Error handling
// export const handleError = ({ error }) => {
//   const message = "Error caught in [server-hooks]: " + error?.message;
//   return { message };
// };
