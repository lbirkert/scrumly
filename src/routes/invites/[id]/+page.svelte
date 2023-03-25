<script lang="ts">
	import SEO from '$lib/SEO.svelte';

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

	const { creator, project } = data.invite;

	const title = 'Invitation';
	const description = `${creator.name} invited you to join ${project.name}`;
	const themeColor = '#E0FFFF';
	const image = {
		alt: `${creator.name}'s Avatar`,
		url: `/avatars/${creator.avatar}?s=m`
	};
</script>

<SEO {title} {description} {themeColor} {image} />

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
				<Avatar member={creator} />
				{creator.name} invited you to join {project.name}
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
