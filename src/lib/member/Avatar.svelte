<script lang="ts">
	import type { SafeMember } from '$lib/server/safe';

	export let member: SafeMember;
	export let size: 's' | 'm' | 'l' = 's';
</script>

<img
	class={size}
	alt={member.name[0]}
	src="/avatars/{member.avatar}?s={size}"
	title="{member.name}'s avatar"
/>

<style>
	img {
		overflow: hidden;
		border-radius: 100%;
		background-color: var(--node-header);
		border: var(--b1);
	}

	img.s {
		width: 16px;
		height: 16px;
	}

	img.m {
		width: 32px;
		height: 32px;
	}

	img.l {
		width: 256px;
		height: 256px;
	}
</style>
