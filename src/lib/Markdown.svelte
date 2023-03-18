<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";
    import HtmlRenderer from "./HtmlRenderer.svelte";
    import CodeRenderer from "./CodeRenderer.svelte";

    export let source: string;
</script>

<SvelteMarkdown bind:source renderers={{ html: HtmlRenderer, code: CodeRenderer }}/>
