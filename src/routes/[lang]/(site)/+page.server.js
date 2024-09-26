import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { i18nObject } from '$i18n/i18n-util';
import { settings } from '$lib/settings.js';
import { PUBLIC_API_URL } from '$env/static/public';
import {generateDummyData} from '$lib/theme/components/frontend/leaderboard/generate.js'

export const load = async ({ locals }) => {
	const locale = locals.locale || 'en';

	const getTableData = () => {
		return {data: generateDummyData(50)};
	}

	await loadLocaleAsync(locale);

	const LL = i18nObject(locale);
	return {
		meta: {
			title: `${settings.siteName} - ${LL.site_title_home()}`,
			description: LL.site_desc_home()
		},
		tableData: getTableData()
	};
};
