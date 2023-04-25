<script lang="ts">
	import type { SafeComment } from '$lib/server/safe';

	import { Member } from '$lib/member';
	import { SinceShort } from '$lib/date';

	export let comment: SafeComment<'project', ''>;
</script>

<Member member={comment.author} />

created this

<SinceShort date={comment.createdAt} />
