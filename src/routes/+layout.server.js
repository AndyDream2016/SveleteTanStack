function parseBooleanCookie(cookieValue, cookieName, cookies, defaultValue = true) {
	let parsedValue;

	if (cookieValue === null || cookieValue === undefined) {
		// If the cookie does not exist, set it to the default value
		parsedValue = defaultValue;
		cookies.set(cookieName, JSON.stringify(parsedValue), {
			path: '/',
			httpOnly: false,
			maxAge: 60 * 60 * 24 * 365 * 10
		});
	} else {
		try {
			parsedValue = JSON.parse(cookieValue);
			if (typeof parsedValue !== 'boolean') {
				throw new Error('Parsed value is not a boolean');
			}
		} catch (e) {
			console.error('Failed to parse cookie value:', e);
			parsedValue = defaultValue;
			cookies.set(cookieName, JSON.stringify(parsedValue), {
				path: '/',
				httpOnly: false,
				maxAge: 60 * 60 * 24 * 365 * 10
			});
		}
	}

	return parsedValue;
}

function parseThemeModeCookie(cookieValue, cookieName, cookies, defaultValue = 'dark') {
	const validThemes = ['light', 'dark', 'tint'];
	let parsedValue;

	if (cookieValue === null || cookieValue === undefined || !validThemes.includes(cookieValue)) {
		// If the cookie does not exist or is invalid, set it to the default value
		parsedValue = defaultValue;
		cookies.set(cookieName, parsedValue, {
			path: '/',
			httpOnly: false,
			maxAge: 60 * 60 * 24 * 365 * 10 // Set cookie to last 10 years
		});
	} else {
		parsedValue = cookieValue;
	}

	return parsedValue;
}

export const load = async ({ request, locals, parent, cookies }) => {
	await parent();
	const sidebarCollapse = parseBooleanCookie(
		cookies.get('sidebarCollapse'),
		'sidebarCollapse',
		cookies
	);
	const themeMode = parseThemeModeCookie(cookies.get('themeMode'), 'themeMode', cookies);
	const userAgent = request.headers.get('user-agent');
	const isMobile = /mobile/i.test(userAgent);
	return {
		locale: locals.locale,
		firstPath: locals.firstPath,
		themeMode: themeMode,
		sidebarCollapse: sidebarCollapse,
		isMobile
	};
};
