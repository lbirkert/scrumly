<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { Avatar } from '$lib/member';
	import { enhance } from '$app/forms';
	import { browser } from '$app/environment';

	export let form: ActionData;
	export let data: PageData;

	$: if (browser && form?.login) {
		window.onbeforeunload = (e) => {
			e.preventDefault();
			e.returnValue = '';
		};
	}
</script>

<main class="dialog">
	{#if form?.login}
		<form action="/" on:submit={() => (window.onbeforeunload = null)}>
			<h1>Memorize your password</h1>
			<p>{form.login}</p>
			<input type="password" disabled value={form.login} />
			<button>Continue</button>
		</form>
	{:else}
		<form method="POST" action="?/accept" use:enhance>
			<h1>Invitation</h1>
			<p>
				<Avatar member={data.invite.creator} />
				{data.invite.creator.name} invited you to join {data.invite.project.name}
			</p>
			<label>
				Name
				<input name="name" required />
			</label>
			{#if form?.error}
				<span class="error">{form.error}</span>
			{/if}
			<button>Accept</button>
		</form>
	{/if}
</main>
