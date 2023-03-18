<script lang="ts">
    import { page } from "$app/stores";

    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<main>
    <header>
        <form>
            <input name="q" placeholder="Search" value={$page.url.searchParams.get("q") || "is:open"}/>
        </form>
        <a class="button" style="--color: lightgreen" href="/issues/new">
            New
        </a>
    </header>
    
    <ul>
        <div/>
        {#each data.issues as issue, i}
            {#if i != 0}
                <li class="spacer"/>
            {/if}
            <li>
                <a href="/issues/{issue.id}" class="issue">
                    {#if issue.closedAt}
                        <span class="close">-</span>
                    {:else}
                        <span class="open">+</span>
                    {/if}
                    <div>
                        <h2>{issue.title}</h2>
                        <span>#{issue.id} opened on {issue.createdAt.toLocaleDateString("en-US")} by {issue.author.name}</span>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
</main>

<style>
    header {
        margin-bottom: 10px;
        display: flex;
        column-gap: 10px;
    }

    header > form {
        width: 100%;
    }

    ul {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
    }

    li a {
        display: flex;
        text-decoration: none;
        color: unset;
    }

    span.open, span.close {
        margin: 0 20px;
    }
</style>
