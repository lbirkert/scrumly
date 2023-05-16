<script lang="ts">
	export let href: string;
	export let text: string;
</script>

<img src={href} alt={text} />

<style>
	img {
		width: 100%;
		border-radius: 10px;
	}
</style>
