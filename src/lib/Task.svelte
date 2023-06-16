<script lang="ts">
	import { Markdown } from '$lib/markdown';
	import { Avatar } from '$lib/member';
	import type { SafeTask } from '$lib/server/safe';

	export let task: Omit<SafeTask<'', '', ''>, 'comments'>;
	export let url = `/tasks/${task.id}`;
</script>

<Markdown source={task.content} />

<footer>
	{#if task.done}
		<span class="close">-</span>
	{:else}
		<span class="open">+</span>
	{/if}

	{#if task.assignees.length}
		<ul class="assignees">
			{#each task.assignees as assignee}
				<Avatar member={assignee} />
			{/each}
		</ul>
	{/if}

	{#if url}
		<a href={url}>View</a>
	{/if}

	<slot />
</footer>

<style>
	footer {
		margin-top: 15px;
		display: flex;
		align-items: center;
		column-gap: 10px;
	}

	ul {
		display: flex;
	}
</style>
