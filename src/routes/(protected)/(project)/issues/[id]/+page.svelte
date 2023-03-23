<script lang="ts">
	import type { PageData } from './$types';
	import { SinceShort } from '$lib/date';
	import { Member } from '$lib/member';

	import { enhance } from '$app/forms';

	import { page } from '$app/stores';

	import Comment from '$lib/Comment.svelte';

	export let data: PageData;
</script>

<main>
	<header>
		<h1>
			{#if data.issue.closedAt}
				<span class="close">-</span>
			{:else}
				<span class="open">+</span>
			{/if}
			{data.issue.title}
		</h1>
		<span>
			#{data.issue.id} opened <SinceShort date={data.issue.createdAt} /> by
			<Member member={data.issue.author} />
		</span>
	</header>

	<div class="spacer" />

	{#if data.issue.comments.length !== 0}
		<ul>
			{#each data.issue.comments as comment}
				<Comment
					bind:comment
					member={data.member}
					edit={$page.url.searchParams.get('edit') === comment.id.toString()}
				/>
			{/each}
		</ul>

		<div class="spacer" />
	{/if}

	<form method="POST" action="?/comment" use:enhance>
		<!-- TODO: write/preview -->
		<textarea name="content" required />

		<div>
			{#if data.issue.author.id === data.member.id}
				{#if data.issue.closedAt}
					<button style="--color: white" formaction="?/toggle" type="submit" formnovalidate>
						Reopen Issue
					</button>
				{:else}
					<button style="--color: magenta" formaction="?/toggle" type="submit" formnovalidate>
						Close Issue
					</button>
				{/if}
			{/if}
			<button style="--color: lightgreen">Comment</button>
		</div>
	</form>
	
	<div class="spacer" />
	
	<form method="POST" use:enhance>
		<h3>Assignee</h3>
		{#if data.issue.assignee}
			<Member member={data.issue.assignee}/>
		{:else}
			<span>None</span>
		{/if}

		<span style="margin-top: 30px">
		{#if data.issue.assignee?.id === data.member.id}
			<button style="--color: white" formaction="?/assign">Unassign</button>
		{:else}
			<button style="--color: white" formaction="?/assign">Assign to yourself</button>
		{/if}
		</span>
		<span>
		<button style="--color: lightcoral" formaction="?/delete">Delete</button>
		</span>
	</form>
</main>

<style>
	header {
		margin-top: 20px;
		margin-bottom: 30px;
	}

	header > h1 {
		display: flex;
		align-items: center;
		column-gap: 20px;
		margin-bottom: 5px;
	}

	header > span {
		display: inline-block;
		margin-bottom: 20px;
	}

	form {
		margin-top: 40px;
		margin-bottom: 40px;
	}

	form > div {
		display: flex;
		justify-content: end;
		column-gap: 10px;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		row-gap: 40px;
		position: relative;
		margin: 40px 0;
	}
</style>
