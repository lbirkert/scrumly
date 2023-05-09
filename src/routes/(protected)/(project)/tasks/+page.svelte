<script lang="ts">
	import SEO from '$lib/SEO.svelte';

	import { page } from '$app/stores';

	import type { PageData } from './$types';

	import Task from '$lib/Task.svelte';

	export let data: PageData;
</script>

<SEO title="Tasks" />

<main>
	<form>
		<input name="q" placeholder="Search" value={$page.url.searchParams.get('q') || 'is:open'} />
		<a class="button" style="--color: lightgreen" href="/tasks/new"> New </a>
	</form>

	<ul>
		{#each data.tasks as task, i}
			{#if i != 0}
				<li class="spacer" />
			{/if}
			<li>
				<Task {task} />
			</li>
		{/each}
	</ul>
</main>

<style>
	form {
		flex-direction: row;
		column-gap: 10px;
		margin-bottom: 40px;
	}

	form > input {
		flex: 1;
	}

	ul {
		display: flex;
		flex-direction: column;
		row-gap: 20px;
	}
</style>
