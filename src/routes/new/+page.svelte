<script lang="ts">
	import type { ActionData } from './$types';

	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import Seo from '$lib/SEO.svelte';

	export let form: ActionData;

	$: if (browser && form?.login) {
		window.onbeforeunload = (e) => {
			e.preventDefault();
			e.returnValue = '';
		};
	}
</script>

<Seo title="Create new Project" />

<main class="dialog">
	{#if form?.login}
		<form action="/" on:submit={() => (window.onbeforeunload = null)}>
			<h1>Memorize your password</h1>
			<p>{form.login}</p>
			<input type="password" disabled value={form.login} />
			<button>Continue</button>
		</form>
	{:else}
		<form method="POST" use:enhance>
			<h1>Create a project</h1>
			<label>
				Registration token
				<input type="password" name="token" required />
			</label>
			<label>
				Name
				<input name="name" required />
			</label>
			{#if form?.error}
				<span class="error">{form.error}</span>
			{/if}
			<button>Submit</button>
		</form>
	{/if}
</main>
