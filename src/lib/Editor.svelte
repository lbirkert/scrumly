<script lang="ts">
	import { enhance } from '$app/forms';

	import { Markdown } from '$lib/markdown';

	export let id: string | undefined = undefined;
	export let content = '';

	export let cancel_url = '?';
	export let action = '?/edit';

	export let preview = false;
</script>

<form method="POST" {action} use:enhance>
	{#if id}
		<input class="hide" value={id} name="id" />
	{/if}

	<header class="showjs">
		<button class:active={!preview} on:click|preventDefault={() => (preview = false)}>Write</button>
		<button class:active={preview} on:click|preventDefault={() => (preview = true)}>Preview</button>
	</header>

	{#if preview}
		<div><Markdown source={content} /></div>
	{:else}
		<textarea required name="content" on:change={(e) => (content = e.target.value)}
			>{content}</textarea
		>
	{/if}

	<footer>
		<slot>
			<a class="button" style="--color: lightcoral" href={cancel_url}>Cancel</a>
			<button style="--color: lightgreen">Update</button>
		</slot>
	</footer>
</form>

<style>
	.active {
		background-color: var(--primary);
		color: var(--on-primary);
	}

	textarea {
		width: 100%;
		margin-bottom: 5px;
	}

	form footer {
		display: flex;
		column-gap: 10px;
	}

	form {
		padding: 10px;
		row-gap: 10px;
	}

	div {
		padding: 5px 10px;
		border-radius: 4px;
		margin-bottom: 5px;
		min-height: 80px;
	}
</style>
