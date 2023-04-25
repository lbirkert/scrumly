<script lang="ts">
	import type { SafeComment } from '$lib/server/safe';

	import { Member } from '$lib/member';
	import { SinceShort } from '$lib/date';

	export let comment: SafeComment<'project', ''>;
</script>

<Member member={comment.author} />

{#if comment.content === 'task_close'}
	closed this
{:else}
	reopened this
{/if}

<SinceShort date={comment.createdAt} />
