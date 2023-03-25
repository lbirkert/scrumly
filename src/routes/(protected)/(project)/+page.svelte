<script lang="ts">
	import SEO from '$lib/SEO.svelte';

	import type { PageData, ActionData } from './$types';

	import { Avatar } from '$lib/member';

	import { enhance } from '$app/forms';

	import { mimes } from '$lib/constants';

	export let data: PageData;
	export let form: ActionData;

	let project: HTMLFormElement;
	let avatar: HTMLFormElement;
	let member: HTMLFormElement;

	let generateDisabled = false;
</script>

<SEO title="Overview" />

<main>
	{#if form?.error}
		<span class="error">{form.error}</span>
	{/if}
	<form method="POST" action="?/project" use:enhance bind:this={project}>
		<h2>Project Settings</h2>
		<label>
			Name
			<span>
				<input
					name="name"
					required
					value={data.project.name}
					on:focusout={() => project.requestSubmit()}
				/>
				<button class="hidejs" style="--color: lightcyan">Update</button>
			</span>
		</label>

		<div class="spacer" />
	</form>
	<form
		method="POST"
		action="?/avatar"
		enctype="multipart/form-data"
		use:enhance
		bind:this={avatar}
	>
		<h2>Member Settings</h2>
		<label class="avatar">
			Avatar
			<Avatar size="l" member={data.member} />
			<input
				class="hide"
				type="file"
				name="file"
				accept={mimes.join(',')}
				on:change={() => avatar.requestSubmit()}
			/>

			<span><button class="hidejs" style="--color: lightcyan">Upload</button></span>
		</label>
	</form>
	<form
		method="POST"
		action="?/generate"
		use:enhance={() => {
			generateDisabled = true;
			return async ({ update }) => {
				await update();
				generateDisabled = false;
			};
		}}
	>
		<span
			><button disabled={generateDisabled} style="--color: lightcyan">Generate random</button></span
		>
	</form>
	<form method="POST" action="?/member" use:enhance bind:this={member}>
		<label>
			Name
			<span>
				<input
					name="name"
					required
					value={data.member.name}
					on:focusout={() => member.requestSubmit()}
				/>
				<button class="hidejs" style="--color: lightcyan">Update</button>
			</span>
		</label>
	</form>
</main>

<style>
	.spacer {
		margin-top: 20px;
	}

	span {
		display: inline-flex;
		column-gap: 10px;
	}

	label :global(img) {
		cursor: pointer;
	}

	form {
		margin-bottom: 30px;
	}

	.error {
		margin-bottom: 20px;
	}
</style>
