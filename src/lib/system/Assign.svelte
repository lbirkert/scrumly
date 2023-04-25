<script lang="ts">
	import type { SafeComment } from '$lib/server/safe';

	import { Member } from '$lib/member';
	import { SinceShort } from '$lib/date';

	export let comment: SafeComment<'project', ''>;
</script>

<Member member={comment.author} />

{#if comment.content === 'assign_self'}
	assigned themselves
{:else}
	unassigned themselves
{/if}

<SinceShort date={comment.createdAt} />
