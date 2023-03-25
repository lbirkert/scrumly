<script lang="ts">
	export let title: string;
	export let description = '';
	export let themeColor = '#90EE90';
	export let image: { url: string; alt: string } | undefined = undefined;

	const pageTitle = `KOTW Teams | ${title}`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="twitter:title" content={pageTitle} />

	<meta name="description" content={description} />
	<meta name="twitter:description" content={description} />

	<meta name="theme-color" content={themeColor} />

	{#if image}
		<meta name="twitter:image" content={image.url} />
		<meta name="twitter:image:alt" content={image.alt} />
	{/if}

	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
</svelte:head>
