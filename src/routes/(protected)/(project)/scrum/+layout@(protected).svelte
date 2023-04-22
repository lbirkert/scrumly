<script lang="ts">
	import type { PageData } from './$types';

	import Header from '../Header.svelte';

	export let data: PageData;
</script>

<Header member={data.member} nologin />

<slot />
