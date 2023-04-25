<script lang="ts">
	import type { SafeScrum } from '$lib/server/safe';
	import { Markdown } from '$lib/markdown';
	import Task from '$lib/Task.svelte';
	import Editor from '$lib/Editor.svelte';
	import NodeHeader from '$lib/NodeHeader.svelte';

	import { enhance } from '$app/forms';

	import { page } from '$app/stores';

	export let id: number;
	export let name: string;

	export let scrums: SafeScrum<'comments', 'project', '', '', '', ''>[];

	export let dragLast: number;
	export let dragFirst: number;
	export let dragScrum: number;
	export let onDragEnd: () => void;
</script>

<header>
	<h3>{name}</h3>
	<a href="/scrum/new?column={id}">+ New</a>
</header>
<ul on:dragover={() => (dragLast = id)} on:dragend={() => dragLast != id && onDragEnd()}>
	{#each scrums as scrum, i}
		{@const edit = $page.url.searchParams.get('edit') === scrum.id}
		{@const del = $page.url.searchParams.get('delete') === scrum.id}
		<li on:dragstart={() => ((dragScrum = i), (dragFirst = id))} draggable={!edit && !del}>
			<div id="scrum-{scrum.id}" class="hide" />

			{#if edit}
				<NodeHeader>Edit Scrum</NodeHeader>
				<Editor id={scrum.id} content={scrum.content || scrum.task?.content || ''} />
			{:else if del}
				<NodeHeader>Delete Scrum</NodeHeader>

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
				<NodeHeader>
					<a href="?edit={scrum.id}">Edit</a>
					<a href="?delete={scrum.id}">Delete</a>
				</NodeHeader>

				{#if scrum.task}
					<div><Task task={scrum.task} /></div>
				{:else}
					<div><Markdown source={scrum.content || ''} /></div>
				{/if}
			{/if}
		</li>
	{/each}
</ul>

<style>
	header {
		padding-bottom: 5px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	ul {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		height: 100%;
		padding-top: 10px;
		overflow-y: scroll;
	}

	li[draggable='true'] {
		cursor: move;
		cursor: grab;
	}

	li {
		user-select: none;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 5px;
	}

	div {
		padding: 10px;
	}

	form {
		padding: 15px;
	}
</style>
