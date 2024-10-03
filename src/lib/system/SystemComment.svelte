<script lang="ts">
	import type { SafeComment } from '$lib/server/safe';

	import Assign from './Assign.svelte';
	import TaskCreate from './TaskCreate.svelte';
	import TaskEdit from './TaskEdit.svelte';
	import TaskDone from './TaskDone.svelte';
	import ScrumMove from './ScrumMove.svelte';
	import Unknown from './Unknown.svelte';

	export let comment: SafeComment<'project'>;

	const actions = {
		assign_self: Assign,
		unassign_self: Assign,
		task_create: TaskCreate,
		task_edit: TaskEdit,
		task_close: TaskDone,
		task_reopen: TaskDone,

		scrum_story: ScrumMove,
		scrum_todo: ScrumMove,
		scrum_doing: ScrumMove,
		scrum_done: ScrumMove
	} as { [key: string]: any };
</script>

<li>
	<svelte:component this={actions[comment.content] || Unknown} bind:comment />
</li>

<style>
	li {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		column-gap: 10px;
		font-size: 14px;
	}
</style>
