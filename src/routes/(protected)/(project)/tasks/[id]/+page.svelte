<script lang="ts">
	import type { PageData } from './$types';
	import { Avatar } from '$lib/member';
	import Editor from '$lib/Editor.svelte';

	import { enhance } from '$app/forms';

	import { page } from '$app/stores';

	import Comment from '$lib/Comment.svelte';
	import Task from '$lib/Task.svelte';

	export let data: PageData;

	let content: string;
</script>

<main>
	<header>
		{#if $page.url.searchParams.get('edit') === ''}
			<Editor content={data.task.content} />
		{:else if $page.url.searchParams.get('delete') === ''}
			<form method="POST" action="?/delete" use:enhance>
				<h4>Are you sure?</h4>
				<p>
					This will delete this issues entire comment section plus the Scrums if there are any
					attached!
				</p>
				<footer>
					<a class="button" href="?">Cancel</a>
					<button style="--color: red">Delete</button>
				</footer>
			</form>
		{:else}
			<div>
				<Task task={data.task}>
					<a href="?edit">Edit</a>
					<a href="?delete">Delete</a>
				</Task>
			</div>
		{/if}
	</header>

	<span class="spacer" />

	{#if data.task.comments.length !== 0}
		<ul>
			{#each data.task.comments as comment}
				<Comment
					bind:comment
					member={data.member}
					edit={$page.url.searchParams.get('edit') === comment.id}
				/>
			{/each}
		</ul>

		<span class="spacer" />
	{/if}

	<Editor action="?/comment" bind:content>
		{#if data.task.done}
			<input class="hide" name="done" value="0" />
			<button formaction="?/done" type="submit" formnovalidate> Reopen </button>
		{:else}
			<input class="hide" name="done" value="1" />
			<button style="--color: magenta" formaction="?/done" type="submit" formnovalidate>
				Close
			</button>
		{/if}
		<button style="--color: lightgreen" on:click={() => setTimeout(() => (content = ''))}
			>Comment</button
		>
	</Editor>

	<span class="spacer" />

	<form method="POST" class="assignees" use:enhance>
		<h3>Assignees</h3>
		{#if data.task.assignees.length}
			<ul>
				{#each data.task.assignees as assignee}
					<li>
						<Avatar member={assignee} size="m" />
					</li>
				{/each}
			</ul>
		{:else}
			none
		{/if}

		{#if data.task.assignees.some((a) => a.id === data.member.id)}
			<button formaction="?/unassign">Unassign</button>
		{:else}
			<button formaction="?/assign">Assign</button>
		{/if}
	</form>
</main>

<style>
	header > div {
		padding: 20px;
	}

	main > form {
		margin-top: 40px;
		margin-bottom: 40px;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		row-gap: 40px;
		position: relative;
		margin: 40px 0;
	}

	.assignees {
		flex-direction: row;
		column-gap: 15px;
		align-items: center;
	}

	.assignees ul {
		margin: 0;
		flex-direction: row;
		column-gap: 10px;
	}
</style>
