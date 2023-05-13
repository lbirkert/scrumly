<script lang="ts">
	import TabBar from '$lib/TabBar.svelte';

	import { Member, type SafeMember } from '$lib/member';

	export let member: Omit<SafeMember<'project', ''>, 'project'>;
	export let nologin = false;
</script>

{#if !nologin}
	<header>
		<form action="/logout" method="POST">
			<p>
				Logged in as
				<Member {member} />
			</p>
			<button style="--color: lightcoral">Logout</button>
		</form>
	</header>
{/if}

<TabBar />

<style>
	form {
		flex-direction: row;
		justify-content: center;
		align-items: center;
		column-gap: 20px;
		padding: 20px 0;
	}

	p {
		text-align: center;
		display: inline-flex;
		align-items: center;
		column-gap: 10px;
	}
</style>
