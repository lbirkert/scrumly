<script lang="ts">
	import SEO from '$lib/SEO.svelte';

	import Column from './Column.svelte';
	import type { PageData } from './$types';
	import type { SafeScrum } from '$lib/server/safe';

	export let data: PageData;

	type Scrum = SafeScrum<'comments', 'project', '', '', '', ''>;

	// TODO: make customizable
	let columns = [
		{ name: 'Story', handle: (v) => v },
		{
			name: 'TODO',
			async handle(v) {
				if (v.task) {
					await fetch(`/tasks/${v.task.id}?/unassign`, {
						method: 'POST',
						body: new URLSearchParams()
					});
					await fetch(`/tasks/${v.task.id}?/done`, {
						method: 'POST',
						body: new URLSearchParams({ done: '0' })
					});
					v.task.assignees = v.task.assignees.filter((a) => a.id !== data.member.id);
					v.task.done = false;
				}
				return v;
			}
		},
		{
			name: 'Doing',
			async handle(v) {
				if (v.task) {
					await fetch(`/tasks/${v.task.id}?/assign`, {
						method: 'POST',
						body: new URLSearchParams()
					});
					await fetch(`/tasks/${v.task.id}?/done`, {
						method: 'POST',
						body: new URLSearchParams({ done: '0' })
					});
					if (!v.task.assignees.some((a) => a.id === data.member.id)) {
						v.task.assignees.push(data.member);
						v.task.done = false;
					}
				}
				return v;
			}
		},
		{
			name: 'Done',
			async handle(v) {
				if (v.task) {
					await fetch(`/tasks/${v.task.id}?/done`, {
						method: 'POST',
						body: new URLSearchParams({ done: '1' })
					});
					v.task.done = true;
				}
				return v;
			}
		}
	] as { scrums: Scrum[]; handle: (v: Scrum) => Promise<Scrum>; name: string }[];

	$: columns = columns.map((c, i) => ((c.scrums = data.scrums.filter((s) => s.column === i)), c));

	export let dragScrum = -1;
	export let dragFirst = -1;
	export let dragLast = -1;

	async function onDragEnd() {
		const firstScrums = columns[dragFirst].scrums;
		const lastScrums = columns[dragLast].scrums;

		const scrum = firstScrums[dragScrum];

		await fetch('?/move', {
			method: 'POST',
			body: new URLSearchParams({ id: scrum.id, to: dragLast.toString() })
		});

		firstScrums.splice(dragScrum, 1);
		lastScrums.push(await columns[dragLast].handle(scrum));

		data.scrums[data.scrums.findIndex((s) => s.id === scrum.id)].column = dragLast;
	}
</script>

<SEO title="Scrum" />

<div>
	<ul>
		{#each columns as column, i}
			<li>
				<Column
					id={i}
					name={column.name}
					scrums={column.scrums}
					{onDragEnd}
					bind:dragScrum
					bind:dragLast
					bind:dragFirst
				/>
			</li>
		{/each}
	</ul>
</div>

<style>
	ul {
		display: flex;
		overflow-x: scroll;
		overflow-y: hidden;
		min-height: unset;
		column-gap: 10px;
		padding: 10px;
		padding-bottom: 0;
		flex: 1;
	}

	li {
		min-width: 400px;
		flex: 1;
		border-radius: 10px;
		padding: 5px;
		padding-bottom: 0;
		display: flex;
		flex-direction: column;
	}

	div {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 42px);
		overflow: hidden;
	}
</style>
