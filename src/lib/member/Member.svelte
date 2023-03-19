<script lang="ts">
    import type { SafeMember } from "$lib/server/safe";
    import Avatar from "./Avatar.svelte";
    
    export let member: SafeMember;

    export let size: "s" | "m" = "s";
</script>

<a href="/members/{member.id}" class={size}>
    <Avatar {member} {size} />
    {member.name}
</a>

<style>
    a {
        display: inline-flex;
        align-items: center;
        column-gap: 8px;
    }

    a.m {
        font-size: 18px;
        column-gap: 12px;
    }
</style>
