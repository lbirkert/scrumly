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

	const paths = [
		{
			pathname: '#scrum',
			name: 'Scrum'
		},
		{
			pathname: '#tasks',
			name: 'Tasks'
		}
	];

	export let data: PageData;
</script>

<TabBar {paths} {active} />

{#if $page.url.hash || '#scrum' === '#scrum'}
	<Scrum scrums={data.scrums} />
{:else if $page.url.hash.startsWith('#tasks/')}
	<h1>kek</h1>
{/if}
