import { getCookie, setCookie } from '$lib/utils/storage';

export function createThemeStore(initialTheme = 'dark', validThemes = ['light', 'dark', 'tint']) {
	const themeAttribute = 'data-theme';

	const isValidTheme = (theme) => validThemes.includes(theme);

	const getCurrentThemeFromDocument = () => {
		if (typeof window !== 'undefined') {
			const currentTheme = document.documentElement.getAttribute(themeAttribute);
			return isValidTheme(currentTheme) ? currentTheme : null;
		}
	};

	const getSavedTheme = () => {
		try {
			if (typeof window !== 'undefined') {
				return localStorage.getItem('themeMode') || getCookie('themeMode');
			}
		} catch (e) {
			console.warn('Unable to access localStorage:', e);
			return getCookie('themeMode');
		}
	};

	const saveTheme = (theme) => {
		currentTheme = theme;
		localStorage.setItem('themeMode', theme);
		setCookie('themeMode', theme, 7);
	};

	// Initialize Theme
	//const savedTheme = getSavedTheme();
	const initialThemeValue = getCurrentThemeFromDocument() || initialTheme;

	// Declare state using the $state rune
	let currentTheme = $state(initialThemeValue);

	// Apply theme to the document and save to storage
	function applyTheme(theme) {
		document.documentElement.setAttribute(themeAttribute, theme);
		saveTheme(theme);
		document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
	}

	// Toggle between light and dark themes
	function toggleTheme(theme) {
		applyTheme(theme);
	}

	// Use $effect to apply the theme whenever it changes
	$effect(() => {
		if (isValidTheme(currentTheme)) {
			//applyTheme(currentTheme);
		} else {
			currentTheme = initialTheme; // Reset to default if invalid
		}
	});

	if (typeof window !== 'undefined') {
		window.addEventListener('storage', (event) => {
			if (event.key === 'theme') {
				const newTheme = event.newValue;
				if (isValidTheme(newTheme) && newTheme !== currentTheme) {
					currentTheme = newTheme;
				}
			}
		});
	}
	return {
		get currentTheme() {
			return currentTheme;
		},
		toggleTheme
	};
}
