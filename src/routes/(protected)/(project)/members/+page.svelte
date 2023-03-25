<script lang="ts">
	import SEO from '$lib/SEO.svelte';

	import type { PageData } from './$types';
	import { Member } from '$lib/member';

	export let data: PageData;
</script>

<SEO title="Members" />

<main>
	<form>
		<input placeholder="Search" />
		<a class="button" style="--color: lightgreen" href="/members/new"> Invite </a>
	</form>
	<ul>
		{#each data.project.members as member}
			<li>
				<Member {member} size="m" />
				<ul>
					{#if member.id === data.member.id}
						<li style="--color: lightblue">you</li>
					{/if}
					{#if member.role === 0}
						<li style="--color: lightcoral">owner</li>
					{/if}
					{#if member.role === 1}
						<li style="--color: orange">admin</li>
					{/if}
				</ul>
			</li>
		{/each}
	</ul>
</main>

<style>
	form {
		flex-direction: row;
		column-gap: 10px;
		margin-bottom: 40px;
	}

	form > input {
		flex: 1;
	}

	main > ul {
		display: flex;
		flex-direction: column;
		row-gap: 20px;
	}

	main > ul > li,
	main ul ul {
		display: flex;
		align-items: center;
		column-gap: 10px;
	}

	main > ul > li {
		column-gap: 20px;
	}

	main li li {
		--color: white;
		padding: 5px 10px;
		border-radius: 10px;
		font-size: 14px;
		border: 1px solid var(--color);
		color: var(--color);
	}
</style>
