export function updateCookie(key, value, options = {}) {
	const {
		path = '/',
		maxAge = 60 * 60 * 24 * 365 * 10, // Default to 10 years
		expires,
		secure = false,
		httpOnly = false,
		sameSite = 'Lax'
	} = options;

	let cookieString = `${key}=${encodeURIComponent(JSON.stringify(value))}; path=${path};`;

	if (maxAge) {
		cookieString += ` max-age=${maxAge};`;
	} else if (expires) {
		cookieString += ` expires=${expires.toUTCString()};`;
	}

	if (secure) {
		cookieString += ' secure;';
	}

	if (httpOnly) {
		cookieString += ' HttpOnly;';
	}

	if (sameSite) {
		cookieString += ` SameSite=${sameSite};`;
	}

	document.cookie = cookieString;
}

export const setCookie = (name, value, days) => {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

export const getCookie = (name) => {
	const nameEQ = name + '=';
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
};
