import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { preprocessMeltUI, sequence } from '@melt-ui/pp';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			out: 'build'
		}),
		alias: {
			'@/*': './src/lib/*',
			$assets: 'src/assets',
			$i18n: 'src/i18n'
		},
		version: {
			name: '0.1'
		}
	},
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()])
};

export default config;
