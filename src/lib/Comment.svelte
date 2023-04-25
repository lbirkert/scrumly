<script lang="ts">
	import type { SafeComment, SafeMember } from '$lib/server/safe';
	import { sinceShort } from '$lib/date';
	import { page } from '$app/stores';

	import { enhance } from '$app/forms';

	import { Member } from '$lib/member';
	import { Markdown } from '$lib/markdown';

	import Editor from '$lib/Editor.svelte';
	import NodeHeader from '$lib/NodeHeader.svelte';
	import { SystemComment } from '$lib/system';

	export let comment: SafeComment<'project', ''>;
	export let member: Omit<SafeMember<'project', ''>, 'project'>;
	export let edit: boolean;

	function copy() {
		navigator.clipboard.writeText(
			new URL(`#comment-${comment.id.toString()}`, $page.url).toString()
		);
	}
</script>

{#if comment.system}
	<SystemComment bind:comment />
{:else}
	<li>
		<div id="comment-{comment.id}" />
		{#if edit}
			<NodeHeader>Edit Comment</NodeHeader>
			<Editor
				id={comment.id}
				content={comment.content}
				cancel_url="?#comment-{comment.id}"
				action="?/comment_update"
			/>
		{:else}
			<NodeHeader>
				<span>
					<Member member={comment.author} />
					commented
					<a title={comment.createdAt.toString()} href="#comment-{comment.id}">
						{sinceShort(comment.createdAt)}
					</a>
				</span>

				<label for="menu-{comment.id}">+</label>
			</NodeHeader>

			<input class="hide" type="checkbox" id="menu-{comment.id}" />
			<menu>
				<a class="button" href="#comment-{comment.id}" on:click|preventDefault={copy}>Copy link</a>
				{#if comment.author.id === member.id}
					<a
						class="button"
						style="--color: lightblue"
						href="?edit={comment.id}#comment-{comment.id}">Edit</a
					>
					<form method="POST" action="?/comment_delete" use:enhance>
						<input class="hide" value={comment.id} name="id" />
						<button style="--color: lightcoral">Delete</button>
					</form>
				{/if}
			</menu>
			<span><Markdown bind:source={comment.content} /></span>
		{/if}
	</li>
{/if}

<style>
	li > div {
		position: absolute;
		top: -60px;
	}

	li {
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 5px;
		position: relative;
	}

	span {
		display: inline-flex;
		align-items: center;
		column-gap: 5px;
		width: 100%;
	}

	label {
		cursor: pointer;
		margin-left: auto;
		user-select: none;
	}
	menu {
		display: none;
	}

	input:checked ~ menu {
		padding: 20px 20px;
		display: flex;
		flex-direction: column;
		row-gap: 5px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 0 0 10px 10px;
		border-top: none;
		background: #111;
		position: absolute;
		z-index: 10;
		right: 0;
	}

	menu > * {
		flex: 1;
	}

	li > span {
		margin-top: 2px;
		padding: 10px 15px;
		display: block;
	}

	menu button,
	menu .button {
		border: none;
		width: 100%;
	}
</style>
