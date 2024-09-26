export function createPathChecker(currentPath, locale = '') {
	return (targetPath) => {
		// If targetPath is '/', check for both '/' and '/locale' as active
		if (targetPath === '/') {
			return currentPath === '/' || currentPath === `/${locale}`;
		}

		// For other paths, remove locale from current path if exists and compare
		let sanitizedPath = currentPath;
		if (locale) {
			sanitizedPath = sanitizedPath.replace(new RegExp(`^/${locale}`), '');
		}
		return sanitizedPath === targetPath;
	};
}
