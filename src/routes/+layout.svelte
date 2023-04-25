<script lang="ts">
	import '../app.css';
	import '@fontsource/fira-mono/latin-400.css';

	import PreloadingIndicator from '$lib/PreloadingIndicator.svelte';
	import { navigating } from '$app/stores';
</script>

{#if $navigating && $navigating.to}
	<PreloadingIndicator />
{/if}

<noscript>
	<style>
		.hidejs {
			display: block;
		}

		.showjs {
			display: none;
		}
	</style>
</noscript>

<svelte:head>
	<script>
		document.documentElement.className = localStorage.getItem('theme') || 'dark';
	</script>
</svelte:head>

<slot />
