<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { page } from '$app/stores';

	export let form: ActionData;

	$: invite = form && new URL(`/invites/${form.id}`, $page.url);

	function copy() {
		navigator.clipboard.writeText(invite?.toString() ?? '');
	}
</script>

<main>
	{#if invite}
		<form>
			<h1>Invitation</h1>
			<p>Here is your invitation link. Send this to the people you are working with</p>
			<input name="invite" value={invite} />
			<a
				href={invite.pathname}
				class="button"
				style="--color: lightgreen"
				on:click|preventDefault={copy}
			>
				Copy
			</a>
		</form>
	{:else}
		<form method="POST" use:enhance>
			<h1>Create Invitation</h1>
			<label>
				Expires on
				<input type="date" name="expires" />
			</label>
			<label>
				Maximum usages
				<input type="number" value={1} name="usages" />
			</label>
			<button style="--color: lightgreen">Create</button>
		</form>
	{/if}
</main>
