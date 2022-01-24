import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import { resolve } from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({ postcss: true }),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			resolve: {
				alias: {
					'@components': resolve('src/lib/components'),
					'@components/*': resolve('src/lib/components/*'),
					'@store': resolve('src/lib/store'),
					'@store/*': resolve('src/lib/store/*'),
					'@utils': resolve('src/lib/utils'),
					'@utils/*': resolve('src/lib/utils/*'),
				}
			}
		}
	}
};

export default config;
