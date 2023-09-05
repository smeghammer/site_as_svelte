// see https://www.twilio.com/blog/svelte-stores-share-data-between-components

import {writable} from "svelte/store";

// test storing parent data only:
export const currentParent = writable();

// and we can probably use this to store the BC too:
// export const breadcrumb = writable([]);
