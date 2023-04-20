<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<main>
	<form method="POST" use:enhance>
		<h1>Create Task</h1>
		<textarea required name="content" />
		<button style="--color: lightgreen">Create</button>
	</form>
</main>
