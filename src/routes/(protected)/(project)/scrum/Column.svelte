<script lang="ts">
	import type { SafeScrum } from '$lib/server/safe';
	import { Markdown } from '$lib/markdown';
	import Task from '$lib/Task.svelte';
	import Editor from '$lib/Editor.svelte';

	import { enhance } from '$app/forms';

	import { page } from '$app/stores';

	export let id: number;
	export let name: string;

	export let scrums: SafeScrum<'', '', '', '', '', ''>[];

	export let dragLast: number;
	export let dragFirst: number;
	export let dragScrum: number;
	export let onDragEnd: () => void;
</script>

<h3>{name}</h3>
<ul on:dragover={() => (dragLast = id)} on:dragend={() => dragLast != id && onDragEnd()}>
	{#each scrums as scrum, i}
		<li on:dragstart={() => ((dragScrum = i), (dragFirst = id))} draggable={true}>
			<div id="scrum-{scrum.id}" class="hide" />

			{#if $page.url.searchParams.get('edit') === scrum.id}
				<Editor id={scrum.id} content={scrum.content || scrum.task?.content || ''}>
					<header>Edit Scrum</header>
				</Editor>
			{:else if $page.url.searchParams.get('delete') === scrum.id}
				<header>Delete Scrum</header>

				<form method="POST" action="?/delete" use:enhance>
					<h4>Are you sure?</h4>
					<!-- TODO: add checkbox to delete task too -->
					<input class="hide" name="id" value={scrum.id} />
					<footer>
						<a class="button" href="?">Cancel</a>
						<button style="--color: red">Delete</button>
					</footer>
				</form>
			{:else}
				<header>
					<a href="?edit={scrum.id}">Edit</a>
					<a href="?delete={scrum.id}">Delete</a>
				</header>

				{#if scrum.task}
					<div><Task task={scrum.task} /></div>
				{:else}
					<div><Markdown source={scrum.content || ''} /></div>
				{/if}
			{/if}
		</li>
	{/each}
</ul>
<a href="/scrum/new?column={id}">+ New</a>

<style>
	h3 {
		margin-bottom: 20px;
	}

	ul {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		height: 100%;
		overflow-y: scroll;
	}

	li {
		cursor: pointer;
		user-select: none;

		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 5px;
	}

	header {
		display: flex;
		column-gap: 10px;
		align-items: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 5px 5px 0 0;
		background-color: #111;
		padding: 10px;
		font-size: 14px;
	}

	div {
		padding: 15px;
	}

	form {
		padding: 15px;
	}
</style>
