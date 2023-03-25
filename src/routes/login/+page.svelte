<script lang="ts">
	import SEO from '$lib/SEO.svelte';

	import type { ActionData } from './$types';

	import { enhance } from '$app/forms';

	export let form: ActionData;
</script>

<SEO title="Login" description="Login to KOTW Teams" />

<main class="dialog">
	<form method="POST" use:enhance>
		<h1>Login</h1>
		<p>Please enter your login secret to continue</p>
		<label>
			Secret
			<input type="password" name="login" />
		</label>

		{#if form?.error}
			<span class="error">{form.error}</span>
		{/if}

		<button>Login</button>
	</form>
</main>

<style>
	p {
		margin-bottom: 20px;
	}

	form {
		max-width: 500px;
	}

	label {
		row-gap: 10px;
	}

	button {
		margin-top: 20px;
	}
</style>
