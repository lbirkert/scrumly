<script lang="ts">
    import TabBar from "./TabBar.svelte";

    import type { SafeMember } from "$lib/server/safe";

    export let member: SafeMember;
</script>

<header>
    <form action="/logout" method="POST">
        <p>
            Logged in as 
            <a href="/users/{member.id}">{member.name}</a>
        </p>
        <button>Logout</button>
    </form>
</header>

<TabBar/>

<style>
    form {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        column-gap: 20px;
        padding: 20px 0;
    }
</style>
