export function setCookie(name, value, days = 7) {
	if (typeof document !== 'undefined') {
		const expires = new Date(Date.now() + days * 864e5).toUTCString();
		document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
	}
}

export function getCookie(name) {
	if (typeof document !== 'undefined') {
		return document.cookie.split('; ').reduce((r, v) => {
			const parts = v.split('=');
			return parts[0] === name ? decodeURIComponent(parts[1]) : r;
		}, '');
	}
	return null;
}
