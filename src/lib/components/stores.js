// see https://www.twilio.com/blog/svelte-stores-share-data-between-components

import {writable} from "svelte/store";

// test storing parent data only:
export const currentParent = writable();

// and we can probably use this to store the BC too:
// export const breadcrumb = writable([]);


// can I manage the main page title from here?
export const currentTitle = writable("")  // hmm - undefined is rendered if no value, or null is rendered if I initialise with null

// a store to hold the hierarchical IDGames download tree structure as you browse (question - is a store LOCAL? yes)
// see https://stackoverflow.com/questions/65092054/how-to-use-svelte-store-with-tree-like-nested-object
export const IDGamesDownloadTree = writable({"id":0,"name":"/","dir":[],"file":[]});   // root level `file` is null, but this is the pattern

// here may be a case for doing it like this instead - index by id, flat, read backwards when rendering. Maybe create an object key?:
// see: https://stackoverflow.com/questions/2002923/using-an-integer-as-a-key-in-an-associative-array-in-javascript
// that way I can match by key rather than iterate to find it:
export const IDGamesDownloadList = writable({"id":0,"name":"/", "parent_id":-1, "child_ids":[], "file":[]});   // root level `file` is null, but this is the pattern
// or:
export const IDGamesDownloadKeyedList = writable({});   // root level `file` is null, but this is the pattern