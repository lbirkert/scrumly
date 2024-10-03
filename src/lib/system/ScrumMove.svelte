<script lang="ts">
	import type { SafeComment } from '$lib/server/safe';

	import { Member } from '$lib/member';
	import { SinceShort } from '$lib/date';

	export let comment: SafeComment<'project'>;
	const destinations = {
		scrum_story: 'Story',
		scrum_todo: 'Todo',
		scrum_doing: 'Doing',
		scrum_done: 'Done'
	} as { [key: string]: string };
</script>

<Member member={comment.author} />

moved this to

<a href="/scrum">{destinations[comment.content] || 'Unknown'}</a>

<SinceShort date={comment.createdAt} />
