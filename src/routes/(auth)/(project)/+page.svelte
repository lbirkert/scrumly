<script lang="ts">
    import type { PageData } from "./$types";

    import { Avatar } from "$lib/member";

    export let data: PageData;
</script>

<main>
    <Avatar size="l" member={data.member}/>
    <p>{data.member.name}</p>
</main>
