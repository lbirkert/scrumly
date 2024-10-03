<script lang="ts">
	export let checked = false;
	export let name = '';
	export let color = '#fff';
	export let className = '';
</script>

<label style="--color: {color}" class={className}>
	<slot />
	<div>
		<input type="checkbox" bind:checked {name} on:change />
		<span />
	</div>
</label>

<style>
	div {
		display: block;
		position: relative;
		height: 16px;
		width: 16px;
		padding: 0;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		border-radius: 4px;
		border: 1px solid var(--color);
	}

	input {
		display: none;
	}

	span {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	/* Create the checkmark/indicator (hidden when not checked) */
	span:after {
		content: '';
		position: absolute;
		display: none;
	}

	span:hover {
		background-color: var(--color);
	}

	input:checked ~ span {
		background-color: var(--color);
	}

	/* Show the checkmark when checked */
	input:checked ~ span:after {
		display: block;
	}

	/* Style the checkmark/indicator */
	span:after {
		left: 4px;
		top: 1px;
		width: 4px;
		height: 8px;
		border: solid black;
		border-width: 0 2px 2px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
</style>
