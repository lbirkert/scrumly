<script lang="ts">
	import { enhance } from '$app/forms';

	export let id: string | undefined = undefined;
	export let content: string;

	export let cancel_url = '?';
	export let action = '?/edit';
</script>

<slot />

<form method="POST" {action} use:enhance>
	{#if id}<input class="hide" value={id} name="id" />{/if}

	<textarea required name="content">{content}</textarea>

	<footer>
		<a class="button" style="--color: lightcoral" href={cancel_url}>Cancel</a>
		<button style="--color: lightgreen">Update</button>
	</footer>
</form>

<style>
	textarea {
		width: 100%;
		margin-bottom: 5px;
	}

	form footer {
		display: flex;
		column-gap: 10px;
	}

	form {
		padding: 10px;
		row-gap: 10px;
	}
</style>
