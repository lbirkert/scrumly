<script lang="ts">
	import type { SafeComment } from '$lib/server/safe';

	import { Member } from '$lib/member';
	import { SinceShort } from '$lib/date';

	export let comment: SafeComment<'project', ''>;
</script>

<Member member={comment.author} />

edited this task

<SinceShort date={comment.createdAt} />
