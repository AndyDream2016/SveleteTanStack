// themeManager.js
const createThemeManager = (validThemes = ['dark', 'light', 'tint']) => {
	const defaultTheme = 'dark';
	const themeAttribute = 'data-theme';

	const isValidTheme = (theme) => validThemes.includes(theme);

	const init = () => {
		const savedTheme = getSavedTheme();
		const initialTheme = savedTheme || getCurrentThemeFromDocument() || defaultTheme;
		setTheme(initialTheme);
	};

	const setTheme = (theme) => {
		if (!isValidTheme(theme)) {
			console.warn(`Invalid theme: ${theme}`);
			return;
		}
		document.documentElement.setAttribute(themeAttribute, theme);

		document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
	};

	const getCurrentThemeFromDocument = () => {
		const currentTheme = document.documentElement.getAttribute(themeAttribute);
		return isValidTheme(currentTheme) ? currentTheme : null;
	};

	const getSavedTheme = () => {
		try {
			return localStorage.getItem('themeMode') || getCookie('themeMode');
		} catch (e) {
			console.warn('Unable to access localStorage:', e);
			return getCookie('themeMode');
		}
	};

	const getCookie = (name) => {
		const nameEQ = name + '=';
		const ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	};

	init();

	return {
		setTheme
	};
};

window.themeManager = createThemeManager();
