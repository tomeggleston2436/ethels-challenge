import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { config as dotenvConfig } from 'dotenv';
import adapter from '@sveltejs/adapter-netlify';

dotenvConfig();

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      '$lib': './src/lib'
    }
  },
  preprocess: vitePreprocess()
};

export default config;