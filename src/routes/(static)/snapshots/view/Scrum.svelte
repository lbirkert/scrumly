<script lang="ts">
	import Task from '$lib/Task.svelte';
	import { Markdown } from '$lib/markdown';

	import SEO from '$lib/SEO.svelte';

	import type { SafeScrum } from '$lib/server/safe';

	type Scrum = SafeScrum<'comments', '', '', ''>;

	export let scrums: Scrum[];

	let columns = [
		{ name: 'Story' },
		{ name: 'TODO' },
		{ name: 'Doing' },
		{ name: 'Done' }
	] as unknown as { name: string; scrums: Scrum[] }[];

	$: {
		columns.forEach((c, i) => (c.scrums = scrums.filter((s) => s.column === i)));
		// Force update
		columns = columns;
	}
</script>

<SEO title="Scrum" />

<div class="main">
	<ul>
		{#each columns as column}
			<li>
				<header>
					<h3>{column.name}</h3>
				</header>
				<ul>
					{#each column.scrums as scrum}
						<li>
							<div id="scrum-{scrum.id}" class="hide" />

							{#if scrum.task}
								<div><Task task={scrum.task} url="#" /></div>
							{:else}
								<div><Markdown source={scrum.content || ''} /></div>
							{/if}
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>

<style>
	.main {
		height: calc(100vh - 42px);
		overflow: hidden;
		padding: 0;
	}

	.main > ul {
		display: flex;
		overflow-x: scroll;
		overflow-y: hidden;
		height: 100%;
		padding: 10px;
		padding-bottom: 0;
	}

	.main > ul > li {
		min-width: 400px;
		flex: 1;
		border-radius: 10px;
		padding: 5px;
		padding-bottom: 0;
		display: flex;
		flex-direction: column;
	}

	.main > ul > li > ul {
		display: flex;
		padding: 10px 0;
		flex-direction: column;
		overflow-y: scroll;
		row-gap: 10px;
	}

	.main > ul > li > ul > li {
		padding: 10px;
		border: var(--b1);
		border-radius: 5px;
	}

	header {
		padding-bottom: 5px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
