<script lang="ts">
	import SEO from '$lib/SEO.svelte';

	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	import type { PageData } from './$types';

	import { SinceShort } from '$lib/date';

	export let data: PageData;
</script>

<SEO title="Snapshots" />

<main>
	<form>
		<a class="button" style="--color: lightgreen" href="/snapshots/new"> New </a>
	</form>

	<ul>
		{#each data.snapshots as snapshot, i}
			{#if i != 0}
				<li class="spacer" />
			{/if}
			<li>
				{#if $page.url.searchParams.get('delete') === snapshot.id}
					<form method="POST" action="?/delete" use:enhance>
						<h4>Are you sure?</h4>
						<input class="hide" name="id" value={snapshot.id} />
						<footer>
							<a class="button" href="?">Cancel</a>
							<button style="--color: red">Delete</button>
						</footer>
					</form>
				{:else}
					<SinceShort date={snapshot.createdAt} />
					<a
						href="/snapshots/{snapshot.id}"
						on:click|preventDefault={() =>
							navigator.clipboard.writeText(
								new URL(`/snapshots/${snapshot.id}`, $page.url).toString()
							)}>Copy link</a
					>
					<a href="/snapshots/?delete={snapshot.id}">Delete</a>
				{/if}
			</li>
		{/each}
	</ul>
</main>

<style>
	main > form {
		flex-direction: row;
		column-gap: 10px;
		margin-bottom: 40px;
	}

	main > ul {
		display: flex;
		flex-direction: column;
		row-gap: 20px;
	}

	main > ul > li,
	main ul ul {
		display: flex;
		align-items: center;
		column-gap: 10px;
	}

	main > ul > li {
		column-gap: 20px;
	}

	main li li {
		--color: white;
		padding: 5px 10px;
		border-radius: 10px;
		font-size: 14px;
		border: 1px solid var(--color);
		color: var(--color);
	}
</style>
