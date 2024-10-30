import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export default defineConfig({
  plugins: [sveltekit()],
  assetsInclude: ['**/*.svg'],
  define: {
    'process.env': process.env
  }
});