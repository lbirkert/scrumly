<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<main>
    <a class="new" href="/issues/new">
        <button>New</button>
    </a>

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
    main {
        padding: 20px;
    }

    .new button {
        border-color: lightgreen;
    }

    .new button:hover {
        background-color: lightgreen;
    }

    ul {
        list-style: none; 
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
