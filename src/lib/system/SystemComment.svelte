<script lang="ts">
	import type { SafeComment } from '$lib/server/safe';

	import Assign from './Assign.svelte';
	import TaskCreate from './TaskCreate.svelte';
	import TaskEdit from './TaskEdit.svelte';
	import TaskDone from './TaskDone.svelte';
	import Unknown from './Unknown.svelte';

	export let comment: SafeComment<'project', ''>;

	const actions = {
		assign_self: Assign,
		unassign_self: Assign,
		task_create: TaskCreate,
		task_edit: TaskEdit,
		task_close: TaskDone,
		task_reopen: TaskDone
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
	}
</style>
