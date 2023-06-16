<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	import TabBar from '$lib/TabBar.svelte';
	import type { Path } from '$lib/TabBar.svelte';

	import Scrum from './Scrum.svelte';

	function active(path: Path, url: URL) {
		if (!path.pathname) {
			return false;
		}

		const hash = url.hash || '#scrum';

		return path.exact ? hash == path.pathname : hash.startsWith(path.pathname);
	}

	export let data: PageData;
	$: snapshot = data.snapshot;
	$: console.log(snapshot);

	let paths: { pathname: string; name: string }[];

	$: {
		paths = [];

		if (data.collection !== undefined) {
			if (data.collection[1] > 0)
				paths.push({
					pathname: `?${data.collection[0]}!${data.collection[1] - 1}`,
					name: 'Previous Snapshot'
				});

			if (data.collection[1] + 1 < data.collection[2].length)
				paths.push({
					pathname: `?${data.collection[0]}!${data.collection[1] + 1}`,
					name: 'Next Snapshot'
				});
		}
	}
</script>

<TabBar {paths} {active} />

{#if $page.url.hash || '#scrum' === '#scrum'}
	<Scrum scrums={snapshot.scrums} />
{:else if $page.url.hash.startsWith('#tasks/')}
	<h1>kek</h1>
{/if}
