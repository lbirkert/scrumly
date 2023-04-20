<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	const column = $page.url.searchParams.get('column') || 0;
</script>

<main>
	<h1>Scrum</h1>

	<details open>
		<summary>Create text node</summary>
		<form action="?/text" method="post" use:enhance>
			<textarea name="content" required />
			<input name="column" class="hide" value={column} />
			<button style="--color: lightblue">Create Text</button>
		</form>
	</details>
	<details open>
		<summary>Create task node</summary>
		<form action="?/task" method="post" use:enhance>
			<textarea name="content" required />
			<input name="column" class="hide" value={column} />
			<button style="--color: yellow">Create Task</button>
		</form>
	</details>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		row-gap: 20px;
	}

	form {
		margin-top: 20px;
	}

	summary {
		font-size: 20px;
		cursor: pointer;
	}
</style>
