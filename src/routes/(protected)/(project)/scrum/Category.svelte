<script lang="ts">
	import type { SafeIssue } from '$lib/server/safe';
	import { SinceShort } from '$lib/date';
	import { Member } from '$lib/member';

	export let id: number;
	export let name: string;

	export let issues: SafeIssue[];

	export let dragLast: number;
	export let dragFirst: number;
	export let dragIssue: number;
	export let onDragEnd: () => void;
</script>

<h3>{name}</h3>
<ul on:dragover={() => (dragLast = id)} on:dragend={() => dragLast != id && onDragEnd()}>
	{#each issues as issue, i}
		{#if i !== 0}
			<li class="spacer" />
		{/if}
		<li on:dragstart={() => ((dragIssue = i), (dragFirst = id))} draggable={true}>
			<h4>
				{#if issue.closedAt}
					<span class="close">-</span>
				{:else}
					<span class="open">+</span>
				{/if}
				{issue.title}
			</h4>
			<span>
				<a href="/issues/{issue.id}" class="issue">
					#{issue.id}
				</a>
				opened <SinceShort date={issue.createdAt} /> by
				<Member member={issue.author} />
			</span>
			{#if issue.assignee}
				<span>
					Assigned to
					<Member member={issue.assignee}/>
				</span>
			{/if}
		</li>
	{/each}
</ul>

<style>
	h3 {
		margin-bottom: 20px;
	}

	ul {
		display: flex;
		flex-direction: column;
		row-gap: 13px;
		height: 100%;
		overflow-y: scroll;
	}

	li {
		cursor: pointer;
		user-select: none;
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}

	li > span {
		font-size: 14px;
		display: inline-flex;
		align-items: center;
		column-gap: 6px;
	}

	h4 {
		margin-bottom: 5px;
		display: inline-flex;
		align-items: center;
		column-gap: 15px;
	}
</style>
