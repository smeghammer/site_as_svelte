import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	
	/** 
	 * https://javascript.plainenglish.io/dockerize-a-svelte-app-e13c4fb92acd 
	 * and
	 * https://stackoverflow.com/questions/70012970/running-a-vite-dev-server-inside-a-docker-container
	 * */
	server:{
		host: '0.0.0.0',
		port: 5173,
	}
});
