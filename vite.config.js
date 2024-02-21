import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    define: {
        'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY)
    }
};

export default defineConfig({
	plugins: [sveltekit()]
});
