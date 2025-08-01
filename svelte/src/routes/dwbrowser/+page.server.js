import { redirect } from '@sveltejs/kit';
 
export function load() {
  // see https://stackoverflow.com/questions/74805197/how-to-redirect-to-page-in-sveltekit
  throw redirect(302, '/dwbrowser/0');
}
