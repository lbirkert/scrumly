<script lang="ts">
	import type { SafeComment, SafeMember } from '$lib/server/safe';
	import { sinceShort } from '$lib/date';
	import { page } from '$app/stores';

	import { enhance } from '$app/forms';

	import { Member } from '$lib/member';
	import { Markdown } from '$lib/markdown';

	export let comment: SafeComment;
	export let member: SafeMember;
	export let edit: boolean;

	function copy() {
		navigator.clipboard.writeText(
			new URL(`#comment-${comment.id.toString()}`, $page.url).toString()
		);
	}
</script>

<li>
	<div id="comment-{comment.id}" />
	{#if edit}
		<header>Edit Comment</header>

		<form method="POST" action="?/comment_update" use:enhance>
			<input value={comment.id} name="id" />

			<textarea required name="content">{comment.content}</textarea>

			<div>
				<a class="button" style="--color: lightcoral" href="?#comment-{comment.id}">Cancel</a>
				<button style="--color: lightgreen">Update Comment</button>
			</div>
		</form>
	{:else}
		<header>
			<span>
				<Member member={comment.author} />
				commented
				<a title={comment.createdAt.toString()} href="#comment-{comment.id}">
					{sinceShort(comment.createdAt)}
				</a>
			</span>

			<label for="menu-{comment.id}">+</label>
		</header>

		<input type="checkbox" id="menu-{comment.id}" />
		<menu>
			<a class="button" href="#comment-{comment.id}" on:click|preventDefault={copy}>Copy link</a>
			{#if comment.author.id === member.id}
				<a class="button" style="--color: lightblue" href="?edit={comment.id}#comment-{comment.id}"
					>Edit</a
				>
				<form method="POST" action="?/comment_delete" use:enhance>
					<input value={comment.id} name="id" />
					<button style="--color: lightcoral">Delete</button>
				</form>
			{/if}
		</menu>
		<span><Markdown bind:source={comment.content} /></span>
	{/if}
</li>

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

	header {
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 5px 5px 0 0;
		background-color: #111;
		padding: 10px;
		font-size: 14px;
	}

	header > span {
		display: inline-flex;
		align-items: center;
		column-gap: 5px;
		width: 100%;
	}

	header > label {
		cursor: pointer;
		margin-left: auto;
		user-select: none;
	}

	input,
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

	li > span,
	li > form {
		margin-top: 2px;
		padding: 10px 15px;
		display: block;
	}

	menu button,
	menu .button {
		border: none;
		width: 100%;
	}

	textarea {
		width: 100%;
		margin-bottom: 10px;
	}

	form > div {
		display: flex;
		column-gap: 20px;
	}
</style>
