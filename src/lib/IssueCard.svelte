<script lang="ts">
    import type { Issue } from "@prisma/client";

    export let issue: Issue;
</script>

<main>
    <h2>{issue.title}</h2>
    <p>{issue.description}</p>
</main>
