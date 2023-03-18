<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<main>
    <p>{data.member.name}</p>
</main>
