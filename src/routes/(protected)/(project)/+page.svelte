<script lang="ts">
	import SEO from '$lib/SEO.svelte';

	import type { PageData } from './$types';

	import { Avatar } from '$lib/member';

	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<SEO title="Overview" />

<main>
	<form method="POST" action="?/project" use:enhance>
		<h2>Project Settings</h2>
		<label>
			Name
			<input name="name" required value={data.project.name} />
		</label>
		<button style="--color: lightblue">Update</button>

		<div class="spacer" />
	</form>
	<form method="POST" action="?/member" use:enhance>
		<h2>Member Settings</h2>
		<Avatar size="l" member={data.member} />
		<label>
			Name
			<input name="name" required value={data.member.name} />
		</label>
		<button style="--color: lightblue">Update</button>
	</form>
</main>

<style>
	.spacer {
		margin-bottom: 30px;
		margin-top: 20px;
	}
</style>
