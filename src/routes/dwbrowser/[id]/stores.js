// see https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores

import { writable } from "svelte/store";

// THIS: https://svelte.dev/repl/a551a40e90374fd2861255c957123af2?version=4.2.0
export const breadcrumb = writable([]);