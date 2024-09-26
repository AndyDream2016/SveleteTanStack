import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import path from 'path';

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			autoInstall: false,
			compiler: 'svelte'
		})
	],
	build: {
		commonjsOptions: {
			transformMixedEsModules: true
		}
	},
	optimizeDeps: {
		exclude: [
			'@sveltejs/kit' // Or any other dependency causing issues
		]
	}
});
