<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import HtmlRenderer from './HtmlRenderer.svelte';
	import CodeRenderer from './CodeRenderer.svelte';
	import ImageRenderer from './ImageRenderer.svelte';

	export let source: string;
</script>

<span
	><SvelteMarkdown
		bind:source
		renderers={{ html: HtmlRenderer, code: CodeRenderer, image: ImageRenderer }}
	/></span
>

<style>
	span {
		display: flex;
		flex-direction: column;
		row-gap: 15px;
	}

	span :global(p) {
		overflow-wrap: break-word;
		overflow: hidden;
	}

	span :global(h1) {
		margin-bottom: 8px;
	}

	span :global(h2) {
		margin-bottom: 6px;
	}

	span :global(h3) {
		margin-bottom: 4px;
	}

	span :global(h4) {
		margin-bottom: 2px;
	}

	span :global(ul),
	span :global(ol) {
		list-style-position: inside;
	}
</style>
