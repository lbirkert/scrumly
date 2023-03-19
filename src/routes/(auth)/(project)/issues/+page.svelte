<script lang="ts">
    import { page } from "$app/stores";

    import type { PageData } from "./$types";

    import { SinceShort } from "$lib/date";

    export let data: PageData;
</script>

<main>
    <form>
        <input name="q" placeholder="Search" value={$page.url.searchParams.get("q") || "is:open"}/>
        <a class="button" style="--color: lightgreen" href="/issues/new">
            New
        </a>
    </form>
    
    <ul>
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
                        <span>
                            #{issue.id} 
                            opened <SinceShort date={issue.createdAt} /> by
                            {issue.author.name}
                        </span>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
</main>

<style>
    form {
        flex-direction: row;
        column-gap: 10px;
        margin-bottom: 40px;
    }

    form > input {
        flex: 1;
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
