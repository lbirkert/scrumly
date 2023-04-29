<script lang="ts">
	import type { PageData } from './$types';

	import { Avatar } from '$lib/member';
	import { page } from '$app/stores';

	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<main>
	<h2>{data._member.name}</h2>
	<Avatar member={data._member} size="l" />
	<ul>
		{#if data._member.id === data.member.id}
			<li style="--color: lightblue">you</li>
		{/if}
		{#if data._member.role === 0}
			<li style="--color: lightcoral">owner</li>
		{/if}
		{#if data._member.role === 1}
			<li style="--color: orange">admin</li>
		{/if}
	</ul>
	{#if data.member.role === 0}
		{#if $page.url.searchParams.get('action') === 'delete'}
			<form method="POST" action="?/delete" use:enhance>
				<h4>Are you sure?</h4>
				<p>This will remove this member from this project. Their session will be revoked</p>
				<footer>
					<a class="button" href="?">Cancel</a>
					<button style="--color: red">Delete</button>
				</footer>
			</form>
		{:else if data._member.id !== data.member.id}
			<a href="?action=delete" class="button" style="--color: red">Delete member</a>
		{/if}
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		row-gap: 20px;
	}

	ul {
		display: flex;
		column-gap: 10px;
	}

	li {
		--color: white;
		padding: 5px 10px;
		border-radius: 10px;
		font-size: 14px;
		border: 1px solid var(--color);
		color: var(--color);
	}
</style>
